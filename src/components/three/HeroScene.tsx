import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import type { Group } from "three";

const BODY = "#6d3fd6";

function GlowButton({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.11, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.6}
        roughness={0.25}
      />
    </mesh>
  );
}

function Stick({ x }: { x: number }) {
  return (
    <group position={[x, -0.18, 0.26]}>
      <mesh>
        <cylinderGeometry args={[0.09, 0.12, 0.22, 20]} />
        <meshStandardMaterial color="#3b1a78" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial
          color="#d0b8fd"
          emissive="#a078f0"
          emissiveIntensity={0.5}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/** Stylized low-poly gamepad with glowing accents */
function Controller() {
  return (
    <Float speed={1.6} rotationIntensity={0.55} floatIntensity={1.4}>
      <group rotation={[0.42, -0.35, 0.06]} scale={1.25}>
        {/* Body */}
        <RoundedBox args={[2.6, 1.15, 0.5]} radius={0.22} smoothness={8}>
          <meshStandardMaterial
            color={BODY}
            emissive="#3b1a78"
            emissiveIntensity={0.35}
            roughness={0.3}
            metalness={0.35}
          />
        </RoundedBox>

        {/* Grips */}
        <mesh position={[-1.18, -0.5, 0.02]} rotation={[0.1, 0, 0.55]}>
          <capsuleGeometry args={[0.33, 0.75, 8, 20]} />
          <meshStandardMaterial
            color={BODY}
            emissive="#3b1a78"
            emissiveIntensity={0.35}
            roughness={0.3}
            metalness={0.35}
          />
        </mesh>
        <mesh position={[1.18, -0.5, 0.02]} rotation={[0.1, 0, -0.55]}>
          <capsuleGeometry args={[0.33, 0.75, 8, 20]} />
          <meshStandardMaterial
            color={BODY}
            emissive="#3b1a78"
            emissiveIntensity={0.35}
            roughness={0.3}
            metalness={0.35}
          />
        </mesh>

        {/* ABXY buttons (diamond, glowing theme colors) */}
        <GlowButton position={[0.82, 0.38, 0.26]} color="#e879f9" />
        <GlowButton position={[0.6, 0.16, 0.26]} color="#a078f0" />
        <GlowButton position={[1.04, 0.16, 0.26]} color="#7dd3fc" />
        <GlowButton position={[0.82, -0.06, 0.26]} color="#f0abfc" />

        {/* D-pad */}
        <mesh position={[-0.82, 0.16, 0.26]}>
          <boxGeometry args={[0.46, 0.15, 0.08]} />
          <meshStandardMaterial
            color="#3b1a78"
            emissive="#a078f0"
            emissiveIntensity={0.45}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[-0.82, 0.16, 0.26]}>
          <boxGeometry args={[0.15, 0.46, 0.08]} />
          <meshStandardMaterial
            color="#3b1a78"
            emissive="#a078f0"
            emissiveIntensity={0.45}
            roughness={0.4}
          />
        </mesh>

        {/* Analog sticks */}
        <Stick x={-0.38} />
        <Stick x={0.38} />

        {/* Glowing light bar */}
        <mesh position={[0, 0.46, 0.22]}>
          <boxGeometry args={[0.55, 0.07, 0.06]} />
          <meshStandardMaterial
            color="#e879f9"
            emissive="#e879f9"
            emissiveIntensity={2.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Orb({
  position,
  scale,
  color,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
}) {
  return (
    <Float speed={2.2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
      </mesh>
    </Float>
  );
}

/** Rotates the whole scene gently toward the mouse for a parallax feel */
function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y +=
      (state.pointer.x * 0.35 - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x +=
      (-state.pointer.y * 0.25 - ref.current.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 6]} intensity={2} color="#d0b8fd" />
      <pointLight position={[-5, -3, 2]} intensity={2} color="#e879f9" />
      <pointLight position={[0, 2.5, 3]} intensity={1.2} color="#a078f0" />
      <ParallaxGroup>
        <Controller />
        <Orb position={[-1.9, 1.35, -1]} scale={0.34} color="#e879f9" />
        <Orb position={[2.1, -1.35, -0.5]} scale={0.26} color="#93c5fd" />
        <Orb position={[-1.7, -1.6, 0]} scale={0.2} color="#c4b5fd" />
        <Orb position={[1.9, 1.6, -1.2]} scale={0.3} color="#f0abfc" />
        <Sparkles
          count={90}
          scale={[7, 5.5, 4]}
          size={2.5}
          speed={0.4}
          color="#d0b8fd"
        />
      </ParallaxGroup>
    </Canvas>
  );
}
