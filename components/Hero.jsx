import { motion } from "motion/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [topic, setTopic] = useState("");
  const [fileName, setFileName] = useState(null);
  const router = useRouter();
  

  function goToLesson(t) {
    // Simple navigation: app expects /lesson?topic=... to exist
    if (!t || !t.trim()) return;
    router.push(`/lesson?topic=${encodeURIComponent(t.trim())}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    goToLesson(topic);
  }

  function handleExampleClick(example) {
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
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold leading-tight"
        >
          Teach. Practice. Master —{" "}
          <span className="text-indigo-600">any topic</span>, instantly.
        </motion.h1>

        <p className="mt-4 text-foreground/70 max-w-xl">
          Type a topic or upload your notes — the AI generates a structured
          lesson, solved examples, and a tailored quiz. Perfect for exam prep,
          quick revision, or supplementing classroom materials.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
          <label htmlFor="topic" className="sr-only">
            Topic
          </label>
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
          <button
            className="ml-2 text-indigo-600 underline"
            onClick={() => handleExampleClick("Photosynthesis")}
          >
            Photosynthesis
          </button>
          <span className="mx-2">•</span>
          <button
            className="text-indigo-600 underline"
            onClick={() => handleExampleClick("Derivatives: basic rules")}
          >
            Derivatives
          </button>
          <span className="mx-2">•</span>
          <button
            className="text-indigo-600 underline"
            onClick={() => handleExampleClick("JavaScript async/await")}
          >
            JS async/await
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-foreground/10">
          <label className="block text-sm font-medium text-slate-700">
            Upload notes (optional)
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              id="file"
              type="file"
              accept="application/pdf, .pptx, image/*, .docx"
              onChange={handleFileChange}
              className="text-sm text-foreground/70"
            />
            <div className="text-sm text-foreground/70">
              {fileName ?? "No file selected"}
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Upload will be processed by the backend to generate a lesson from
            *your* notes. (This is a placeholder — we can wire this to Google AI
            Studio / Gemini or your ingestion API next.)
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
            <span className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">
              1
            </span>
            <div>
              <div className="font-medium">A structured lesson</div>
              <div className="text-sm text-foreground/70">
                Clear overview, sectioned syllabus, and key points.
              </div>
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 font-semibold">
              2
            </span>
            <div>
              <div className="font-medium">Worked examples</div>
              <div className="text-sm text-foreground/70">
                Step-by-step solutions so you actually learn the process.
              </div>
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-semibold">
              3
            </span>
            <div>
              <div className="font-medium">A tailored quiz</div>
              <div className="text-sm text-foreground/70">
                Multiple-choice + short answers to test understanding.
              </div>
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-9 h-9 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-700 font-semibold">
              ★
            </span>
            <div>
              <div className="font-medium">Optional: Teach from your notes</div>
              <div className="text-sm text-foreground/70">
                Upload slides/PDFs and the AI will ground lessons in your
                materials.
              </div>
            </div>
          </li>
        </ul>
      </motion.div>
    </section>
  );
};

export default Hero;
