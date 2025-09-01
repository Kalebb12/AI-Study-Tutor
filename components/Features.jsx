import { motion } from "motion/react";
const Features = () => {
  return (
    <section id="features" className="mt-12">
      <h2 className="text-2xl font-semibold">Features built for learning</h2>
      <p className="mt-2 text-foreground/70 max-w-2xl">
        Focused, no-fluff tools that help students actually retain knowledge —
        not just skim content.
      </p>

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
  );
};

export default Features;

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