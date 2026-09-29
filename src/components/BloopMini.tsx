import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

const W = 800;
const H = 500;
const BALL_R = 7;
const SPEED = 640;
const MAX_BOUNCES = 4;
const MIN_ANGLE = 0.15;
const CANNON = { x: W / 2, y: H - 26 };
const COLORS = ["#a078f0", "#e879f9", "#7dd3fc", "#fbbf24", "#b795f8"];
const BEST_KEY = "bloop-mini-best";

type Bloop = { x: number; y: number; baseY: number; r: number; vx: number; phase: number; color: string };
type Ball = { x: number; y: number; vx: number; vy: number; bounces: number; combo: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };
type Status = "idle" | "playing" | "cleared" | "lost";

type Game = {
  bloops: Bloop[];
  ball: Ball | null;
  particles: Particle[];
  angle: number;
  level: number;
  shots: number;
  score: number;
  best: number;
  status: Status;
  t: number;
  clearTimer: number;
};

type Hud = Pick<Game, "level" | "shots" | "score" | "best" | "status">;

function loadBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function makeLevel(level: number): Bloop[] {
  const count = Math.min(3 + level, 12);
  const bloops: Bloop[] = [];
  for (let tries = 0; bloops.length < count && tries < 600; tries++) {
    const r = 20 + Math.random() * 10;
    const x = r + 30 + Math.random() * (W - 2 * (r + 30));
    const y = r + 40 + Math.random() * (H * 0.5 - r);
    if (bloops.some((b) => Math.hypot(b.x - x, b.baseY - y) < b.r + r + 16)) continue;
    const drift = level >= 3 ? (Math.random() < 0.5 ? -1 : 1) * (15 + level * 6) : 0;
    bloops.push({
      x,
      y,
      baseY: y,
      r,
      vx: drift,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[bloops.length % COLORS.length],
    });
  }
  return bloops;
}

function startLevel(g: Game, level: number) {
  if (level === 1) g.score = 0;
  g.level = level;
  g.bloops = makeLevel(level);
  g.shots = g.bloops.length + 2;
  g.ball = null;
  g.status = "playing";
}

/** Keeps the cannon pointing upward, even if the pointer is below it */
function clampAngle(a: number) {
  if (a > 0) a = a < Math.PI / 2 ? -MIN_ANGLE : -Math.PI + MIN_ANGLE;
  return Math.min(-MIN_ANGLE, Math.max(-Math.PI + MIN_ANGLE, a));
}

function burst(g: Game, b: Bloop) {
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const s = 80 + Math.random() * 140;
    g.particles.push({ x: b.x, y: b.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color: b.color });
  }
}

function update(g: Game, dt: number, onChange: () => void) {
  g.t += dt;

  for (const b of g.bloops) {
    b.x += b.vx * dt;
    if (b.x < b.r + 10 || b.x > W - b.r - 10) {
      b.vx *= -1;
      b.x = Math.min(W - b.r - 10, Math.max(b.r + 10, b.x));
    }
    b.y = b.baseY + Math.sin(g.t * 2 + b.phase) * 6;
  }

  for (const p of g.particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 420 * dt;
    p.life -= dt * 1.6;
  }
  g.particles = g.particles.filter((p) => p.life > 0);

  if (g.status === "cleared") {
    g.clearTimer -= dt;
    if (g.clearTimer <= 0) {
      startLevel(g, g.level + 1);
      onChange();
    }
    return;
  }

  const ball = g.ball;
  if (g.status !== "playing" || !ball) return;

  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  if (ball.x < BALL_R || ball.x > W - BALL_R) {
    ball.x = Math.min(W - BALL_R, Math.max(BALL_R, ball.x));
    ball.vx *= -1;
    ball.bounces++;
  }
  if (ball.y < BALL_R) {
    ball.y = BALL_R;
    ball.vy = Math.abs(ball.vy);
    ball.bounces++;
  }

  let popped = false;
  g.bloops = g.bloops.filter((b) => {
    if (Math.hypot(b.x - ball.x, b.y - ball.y) > b.r + BALL_R) return true;
    burst(g, b);
    ball.combo++;
    // Combos and trick shots off walls are worth more
    g.score += 100 * ball.combo + 50 * ball.bounces;
    popped = true;
    return false;
  });

  if (g.bloops.length === 0) {
    g.ball = null;
    g.score += g.shots * 150;
    g.status = "cleared";
    g.clearTimer = 1.4;
    onChange();
    return;
  }

  if (ball.bounces > MAX_BOUNCES || ball.y > H + BALL_R) {
    g.ball = null;
    if (g.shots === 0) g.status = "lost";
    onChange();
    return;
  }

  if (popped) onChange();
}

function draw(g: Game, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const scale = canvas.width / W;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(183, 149, 248, 0.06)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Aim guide with one predicted wall bounce
  if (g.status === "playing" && !g.ball && g.shots > 0) {
    let x = CANNON.x + Math.cos(g.angle) * 40;
    let y = CANNON.y + Math.sin(g.angle) * 40;
    let vx = Math.cos(g.angle);
    let vy = Math.sin(g.angle);
    let bounces = 0;
    for (let i = 0; i < 48 && bounces < 2; i++) {
      x += vx * 9;
      y += vy * 9;
      if (x < BALL_R || x > W - BALL_R) {
        vx *= -1;
        bounces++;
      }
      if (y < BALL_R) {
        vy = Math.abs(vy);
        bounces++;
      }
      if (i % 2 === 0) {
        ctx.fillStyle = `rgba(240, 232, 255, ${0.7 - i / 70})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const lookX = g.ball?.x ?? CANNON.x;
  const lookY = g.ball?.y ?? CANNON.y;
  for (const b of g.bloops) {
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
    ctx.beginPath();
    ctx.arc(b.x - b.r * 0.38, b.y - b.r * 0.42, b.r * 0.26, 0, Math.PI * 2);
    ctx.fill();

    const look = Math.atan2(lookY - b.y, lookX - b.x);
    for (const side of [-1, 1]) {
      const ex = b.x + side * b.r * 0.34;
      const ey = b.y - b.r * 0.08;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(ex, ey, b.r * 0.26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#1e1233";
      ctx.beginPath();
      ctx.arc(ex + Math.cos(look) * b.r * 0.1, ey + Math.sin(look) * b.r * 0.1, b.r * 0.13, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (const p of g.particles) {
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  if (g.ball) {
    ctx.shadowColor = "#b795f8";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(g.ball.x, g.ball.y, BALL_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  ctx.save();
  ctx.translate(CANNON.x, CANNON.y);
  ctx.rotate(g.angle);
  ctx.fillStyle = "#a078f0";
  ctx.beginPath();
  ctx.roundRect(0, -8, 42, 16, 8);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = "#3b1a78";
  ctx.strokeStyle = "#b795f8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(CANNON.x, CANNON.y, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function hudOf(g: Game): Hud {
  return { level: g.level, shots: g.shots, score: g.score, best: g.best, status: g.status };
}

/** A tiny browser take on Bloop: Bounce Shooter */
export default function BloopMini() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game>({
    bloops: makeLevel(1),
    ball: null,
    particles: [],
    angle: -Math.PI / 2,
    level: 1,
    shots: 0,
    score: 0,
    best: loadBest(),
    status: "idle",
    t: 0,
    clearTimer: 0,
  });
  const [hud, setHud] = useState<Hud>(() => hudOf(game.current));

  const sync = useRef(() => {
    const g = game.current;
    if (g.score > g.best) {
      g.best = g.score;
      try {
        localStorage.setItem(BEST_KEY, String(g.best));
      } catch {
        /* storage unavailable — best score just won't persist */
      }
    }
    setHud(hudOf(g));
  }).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      draw(game.current, ctx, canvas);
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      update(game.current, dt, sync);
      draw(game.current, ctx, canvas);
      raf = requestAnimationFrame(frame);
    };

    // Only run the loop while the game is on screen
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [sync]);

  const start = () => {
    startLevel(game.current, 1);
    sync();
    canvasRef.current?.focus();
  };

  const fire = () => {
    const g = game.current;
    if (g.status !== "playing" || g.ball || g.shots <= 0) return;
    g.shots--;
    const cos = Math.cos(g.angle);
    const sin = Math.sin(g.angle);
    g.ball = {
      x: CANNON.x + cos * 40,
      y: CANNON.y + sin * 40,
      vx: cos * SPEED,
      vy: sin * SPEED,
      bounces: 0,
      combo: 0,
    };
    sync();
  };

  const aimAt = (e: PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    game.current.angle = clampAngle(Math.atan2(y - CANNON.y, x - CANNON.x));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
    const g = game.current;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      g.angle = clampAngle(g.angle + (e.key === "ArrowLeft" ? -0.06 : 0.06));
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      fire();
    }
  };

  const playing = hud.status === "playing" || hud.status === "cleared";

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lilac-400/10 px-5 py-3 text-sm">
        <div className="flex items-center gap-5">
          <span className="text-slate-400">
            Level <strong className="font-display text-white">{hud.level}</strong>
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            Shots
            <span className="flex gap-1" aria-label={`${hud.shots} shots left`}>
              {Array.from({ length: Math.min(hud.shots, 14) }).map((_, i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-lilac-300" />
              ))}
              {hud.shots === 0 && <span className="text-slate-500">0</span>}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-slate-400">
            Score <strong className="font-display text-white">{hud.score}</strong>
          </span>
          <span className="text-slate-400">
            Best <strong className="font-display text-amber-300">{hud.best}</strong>
          </span>
        </div>
      </div>

      <div className="relative bg-night-950/60">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          aria-label="Bloop mini game. Use left and right arrow keys to aim and Space to shoot."
          onPointerMove={aimAt}
          onPointerDown={aimAt}
          onPointerUp={(e) => {
            aimAt(e);
            fire();
          }}
          onKeyDown={onKeyDown}
          className={`block aspect-8/5 w-full ${playing ? "touch-none" : ""}`}
        />

        <p className="sr-only" aria-live="polite">
          {hud.status === "cleared" && `Level ${hud.level} cleared`}
          {hud.status === "lost" && `Out of shots. Final score ${hud.score}`}
        </p>

        {hud.status === "cleared" && (
          <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center">
            <span className="font-display rounded-full bg-lilac-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-lilac-900/50">
              Level {hud.level} cleared!
            </span>
          </div>
        )}

        {(hud.status === "idle" || hud.status === "lost") && (
          <div className="absolute inset-0 grid place-items-center bg-night-950/70 p-6 text-center backdrop-blur-sm">
            <div>
              <p className="font-display text-2xl font-bold text-white md:text-3xl">
                {hud.status === "idle" ? "Pop every Bloop" : "Out of shots!"}
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-300">
                {hud.status === "idle"
                  ? "Aim, bounce off the walls and clear the board before you run out of shots."
                  : `You reached level ${hud.level} with ${hud.score} points.`}
              </p>
              <button
                type="button"
                onClick={start}
                className="press glow mt-6 rounded-full bg-lilac-600 px-7 py-3 font-semibold text-white hover:bg-lilac-500"
              >
                {hud.status === "idle" ? "Play" : "Try again"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
