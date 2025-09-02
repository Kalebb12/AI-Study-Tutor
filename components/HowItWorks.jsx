"use client"
import { motion } from "motion/react";
const HowItWorks = () => {
  return (
    <section
      id="how"
      className="mt-12 rounded-2xl p-6 shadow-sm border border-foreground/10"
    >
      <h2 className="text-2xl font-semibold">How it works — simple, fast</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StepCard
          step={1}
          title="Give a topic or upload notes"
          desc="Type any subject or upload class notes/PDFs."
        />
        <StepCard
          step={2}
          title="Get a lesson and examples"
          desc="The AI produces a clear lesson with worked examples and checkpoints."
        />
        <StepCard
          step={3}
          title="Practice with a quiz"
          desc="Instant quiz generation — practice, retry, and track your growth."
        />
      </div>
    </section>
  );
};

export default HowItWorks;

function StepCard({ step, title, desc }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-2xl p-4 bg-background border border-foreground/10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center font-semibold text-indigo-600 shadow">{step}</div>
        <div className="font-medium">{title}</div>
      </div>
      <div className="mt-2 text-sm text-foreground/70">{desc}</div>
    </motion.div>
  );
}
