"use client";


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ThemeToggle } from "@/components/custom/ThemeToggle";

export default function HomePage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [fileName, setFileName] = useState(null);

  function goToLesson(t) {
    // Simple navigation: app expects /lesson?topic=... to exist
    if (!t || !t.trim()) return;
    router.push(`/lesson?topic=${encodeURIComponent(t.trim())}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    goToLesson(topic);
  }

  function handleExampleClick() {
    setTopic(example);
    goToLesson(example);
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) {
      setFileName(null);
      return;
    }
    setFileName(f.name);
    // Note: upload plumbing is intentionally left out in this MVP page.
    // We'll wire /api/teach file ingestion next when you want to add server-side parsing.
  }

  return (
    <div>
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-rose-500 shadow-lg flex items-center justify-center text-white font-bold italic">X</div>
          <div>
            <div className="text-lg font-semibold">AI Study Tutor</div>
            <div className="text-xs text-foreground/70">Instant lessons, worked examples, and quizzes</div>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm text-foreground/70">
          <a href="#features" className="hover:text-foreground/100">Features</a>
          <a href="#how" className="hover:text-foreground/100">How it works</a>
          <a href="#pricing" className="hover:text-foreground/100">Pricing</a>
          <ThemeToggle/>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-extrabold bg== leading-tight"
            >
              Teach. Practice. Master — <span className="text-indigo-600">any topic</span>, instantly.
            </motion.h1>

            <p className="mt-4 text-foreground/70 max-w-xl">
              Type a topic or upload your notes — the AI generates a structured lesson, solved
              examples, and a tailored quiz. Perfect for exam prep, quick revision, or
              supplementing classroom materials.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
              <label htmlFor="topic" className="sr-only">Topic</label>
              <input
                id="topic"
                className="flex-1 rounded-2xl border border-foreground/10 shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="Try: "
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                aria-label="Enter topic"
              />
              <button
                type="submit"
                className="rounded-2xl bg-indigo-600 text-white px-5 py-3 font-medium shadow-md hover:bg-indigo-700 focus:outline-none"
              >
                Teach me
              </button>
            </form>

            <div className="mt-4 text-sm text-foreground/70">
              Try an example: 
              <button className="ml-2 text-indigo-600 underline" onClick={() => handleExampleClick('Photosynthesis')}>Photosynthesis</button>
              <span className="mx-2">•</span>
              <button className="text-indigo-600 underline" onClick={() => handleExampleClick('Derivatives: basic rules')}>Derivatives</button>
              <span className="mx-2">•</span>
              <button className="text-indigo-600 underline" onClick={() => handleExampleClick('JavaScript async/await')}>JS async/await</button>
            </div>

            <div className="mt-6 pt-4 border-t border-foreground/10">
              <label className="block text-sm font-medium text-slate-700">Upload notes (optional)</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="file"
                  type="file"
                  accept="application/pdf, .pptx, image/*, .docx"
                  onChange={handleFileChange}
                  className="text-sm text-foreground/70"
                />
                <div className="text-sm text-foreground/70">{fileName ?? 'No file selected'}</div>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Upload will be processed by the backend to generate a lesson from *your* notes. (This is a placeholder — we can wire this to Google AI Studio / Gemini or your ingestion API next.)
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 bg-gradient-to-b from-background/80 to-background shadow-lg border border-foreground/10"
          >
            <h3 className="text-lg font-semibold mb-3">What you’ll get</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <span className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">1</span>
                <div>
                  <div className="font-medium">A structured lesson</div>
                  <div className="text-sm text-foreground/70">Clear overview, sectioned syllabus, and key points.</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 font-semibold">2</span>
                <div>
                  <div className="font-medium">Worked examples</div>
                  <div className="text-sm text-foreground/70">Step-by-step solutions so you actually learn the process.</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-semibold">3</span>
                <div>
                  <div className="font-medium">A tailored quiz</div>
                  <div className="text-sm text-foreground/70">Multiple-choice + short answers to test understanding.</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-9 h-9 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-700 font-semibold">★</span>
                <div>
                  <div className="font-medium">Optional: Teach from your notes</div>
                  <div className="text-sm text-foreground/70">Upload slides/PDFs and the AI will ground lessons in your materials.</div>
                </div>
              </li>
            </ul>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mt-12">
          <h2 className="text-2xl font-semibold">Features built for learning</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">Focused, no-fluff tools that help students actually retain knowledge — not just skim content.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Structured lessons"
              desc="Overview → sections → deep dives. Every lesson has a small syllabus so students know what to expect."
            />
            <FeatureCard
              title="Step-by-step examples"
              desc="Worked examples with commentary and checkpoints that confirm understanding."
            />
            <FeatureCard
              title="Quizzes & practice"
              desc="Balanced mix of MCQs and short answers to test recall and application."
            />
            <FeatureCard
              title="Upload your notes"
              desc="Convert slides, PDFs, or images into lessons that reflect your class materials. (Planned.)"
            />
            <FeatureCard
              title="Low-cost & cache-first"
              desc="Cache common lessons so repeat requests are free — keep costs predictable as you scale."
            />
            <FeatureCard
              title="Teacher-ready"
              desc="Export quizzes, share with a class, or produce printable revision guides. (Roadmap.)"
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="mt-12 rounded-2xl p-6 shadow-sm border border-foreground/10">
          <h2 className="text-2xl font-semibold">How it works — simple, fast</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard step={1} title="Give a topic or upload notes" desc="Type any subject or upload class notes/PDFs." />
            <StepCard step={2} title="Get a lesson and examples" desc="The AI produces a clear lesson with worked examples and checkpoints." />
            <StepCard step={3} title="Practice with a quiz" desc="Instant quiz generation — practice, retry, and track your growth." />
          </div>
        </section>

        {/* QUICK PRICING CTA */}
        <section id="pricing" className="mt-12 rounded-2xl p-6 text-center bg-gradient-to-r from-indigo-600 to-rose-500 text-white">
          <h3 className="text-2xl font-semibold">Start small. Scale later.</h3>
          <p className="mt-2 max-w-2xl mx-auto">Freemium for quick testing, pay-as-you-go or subscription for heavy use. Pricing options are flexible — we can sketch a simple credit-based model next.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => goToLesson('Photosynthesis')}
              className="bg-white text-indigo-600 rounded-full px-6 py-3 font-semibold shadow hover:opacity-95"
            >
              Try an example — Photosynthesis
            </button>
            <a href="mailto:hello@example.com" className="inline-flex items-center px-6 py-3 border border-white/25 rounded-full text-sm font-medium">Contact us</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 py-8 text-sm text-foreground/70">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>© {new Date().getFullYear()} AI Study Tutor — built for curious learners.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground/100">Privacy</a>
              <a href="#" className="hover:text-foreground/100">Terms</a>
              <a href="#" className="hover:text-foreground/100">Docs</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* -------------------- Small presentational subcomponents -------------------- */

function FeatureCard({ title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-2xl p-5 bg-background shadow-sm border border-foreground/10"
    >
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-foreground/70">{desc}</div>
    </motion.div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div className="rounded-2xl p-4 bg-background border border-foreground/10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center font-semibold text-indigo-600 shadow">{step}</div>
        <div className="font-medium">{title}</div>
      </div>
      <div className="mt-2 text-sm text-foreground/70">{desc}</div>
    </div>
  );
}
