import { useState, type FormEvent } from "react";
import { site } from "../data/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form that delivers messages straight to Rahim's inbox
 * via Web3Forms (free, serverless). Falls back to a mailto link
 * until the access key is configured in src/data/site.ts.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Not configured yet? Open the visitor's mail app instead.
    if (site.web3formsKey.startsWith("PASTE_")) {
      const name = data.get("name") ?? "";
      const message = data.get("message") ?? "";
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Portfolio message from ${name}`,
      )}&body=${encodeURIComponent(String(message))}`;
      return;
    }

    setStatus("sending");
    data.append("access_key", site.web3formsKey);
    data.append("from_name", "Portfolio Contact Form");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
        <div className="text-5xl">🎉</div>
        <h3 className="font-display mt-4 text-2xl font-bold text-white">
          Message sent!
        </h3>
        <p className="mt-2 text-slate-400">
          Thanks for reaching out — I’ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-lilac-300 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass mx-auto max-w-xl rounded-3xl p-8 text-left md:p-10"
    >
      {/* Honeypot spam trap — hidden from humans */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-lilac-200">Name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="mt-2 w-full rounded-xl border border-lilac-800/60 bg-night-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-lilac-400"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-lilac-200">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-lilac-800/60 bg-night-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-lilac-400"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-lilac-200">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell me about your project, partnership idea, or just say hi…"
          className="mt-2 w-full resize-none rounded-xl border border-lilac-800/60 bg-night-900/80 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-lilac-400"
        />
      </label>

      <label className="mt-5 flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          name="cv_requested"
          value="Yes — send CV"
          className="h-4 w-4 accent-lilac-500"
        />
        <span className="text-sm text-slate-300">
          Please send me a copy of your CV
        </span>
      </label>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Something went wrong — please email me directly at {site.email}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="glow mt-7 w-full rounded-full bg-lilac-600 px-8 py-4 font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message ✦"}
      </button>
    </form>
  );
}
