"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  Image as ImageIcon,
  Layers,
  Link2,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const steps = [
  {
    title: "Capture",
    description:
      "Save links, notes, images, and documents in seconds with a unified flow.",
    icon: BookOpen,
  },
  {
    title: "Organize",
    description:
      "Everything lives in a structured knowledge hub with dependable storage.",
    icon: FileText,
  },
  {
    title: "Share",
    description: "Share your brain with others.",
    icon: Workflow,
  },
];

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, hydrated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleStartCapturing = () => {
    if (!hydrated || !isMounted) return;

    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signup");
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900">
              <Brain size={20} />
            </div>
            <div className="text-lg font-semibold tracking-tight">Brainly</div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a
              className="transition hover:text-[var(--fg)]"
              href="#capabilities"
            >
              Capabilities
            </a>
            <a className="transition hover:text-[var(--fg)]" href="#workflow">
              Workflow
            </a>
            <a className="transition hover:text-[var(--fg)]" href="#cta">
              Get Started
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={handleStartCapturing}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 shadow-sm transition hover:translate-y-[-1px] hover:shadow-md"
            >
              Start capturing
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24">
        <section className="pb-16 pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Your personal knowledge hub for everything.
              </h1>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleStartCapturing}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 shadow-sm transition hover:translate-y-[-1px] hover:shadow-md"
                >
                  Launch your hub
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6 text-sm">
                {[
                  { label: "Sources supported", value: "5+" },
                  { label: "Upload types", value: "Images & Docs" },
                  { label: "Focus", value: "Zero clutter" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="surface ring-soft rounded-2xl px-4 py-3"
                  >
                    <div className="text-lg font-semibold">{stat.value}</div>
                    <div className="text-xs text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="surface ring-soft relative overflow-hidden rounded-3xl p-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Today’s capture</div>
                </div>
                <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-950 p-5">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <ImageIcon size={16} />
                    Visual insights
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Screenshots, images, and videos from any source with instant
                    context.
                  </p>
                </div>
                <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-950 p-5">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <BookOpen size={16} />
                    Written knowledge
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Articles, links, notes, and ideas—all in one searchable
                    place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="scroll-mt-24 py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight">
                Designed to scale your memory, not your complexity.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Multi-source capture",
                  description:
                    "Links, notes, uploads, and media — all supported.",
                  icon: Link2,
                },
                {
                  title: "Structured data",
                  description: "Everything is organized for long-term recall.",
                  icon: Layers,
                },
                {
                  title: "AI roadmap (planned)",
                  description: "Embeddings and semantic search are upcoming.",
                  icon: Sparkles,
                },
                {
                  title: "Sharing",
                  description:
                    "Collaborative sharing so knowledge can travel with your team.",
                  icon: Workflow,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="surface surface-hover rounded-3xl p-5"
                  >
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-black/5 text-zinc-800 dark:bg-white/10 dark:text-zinc-200">
                        <Icon size={16} />
                      </span>
                      {item.title}
                    </div>
                    <p className="mt-3 text-sm text-muted">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="workflow" className="scroll-mt-24 py-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              A simple workflow that feels premium.
            </h2>
            <p className="text-muted">
              Brainly keeps the capture flow lightweight so your attention stays
              on what matters.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="surface surface-hover rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-zinc-200">
                      <Icon size={18} />
                    </div>
                    <ArrowRight size={16} className="text-muted" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16">
          <div className="surface ring-soft flex flex-col items-start gap-8 rounded-[32px] p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight">
                Build your second Brain in minutes.
              </h2>
              <p className="text-muted">
                Start capturing now. No credit card required.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/signup">
                <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 shadow-sm transition hover:translate-y-[-1px] hover:shadow-md">
                  Create workspace
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer
        id="cta"
        className="scroll-mt-24 border-t border-white/10 pb-16 pt-10"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[32px] bg-zinc-950 px-8 py-10 text-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.7)]">
            <div className="absolute inset-0 opacity-60"></div>
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.6fr] lg:items-center">
              <div className="space-y-4">
                <p className="max-w-md text-sm text-white/70">
                  Your personal knowledge hub for capturing and recalling
                  everything you know.
                </p>
              </div>
              <div className="grid gap-2 text-sm text-white/70">
                <span>Terms &amp; Conditions</span>
                <span>Privacy Policy</span>
                <span>Refund &amp; Cancellation</span>
              </div>
              <div className="space-y-3 text-sm text-white/60 lg:text-right">
                <div>© 2026 Brainly. All rights reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
