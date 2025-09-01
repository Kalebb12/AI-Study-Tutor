import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-rose-500 shadow-lg flex items-center justify-center text-white font-bold italic">
          X
        </div>
        <div>
          <div className="text-lg font-semibold">Tutor X</div>
          <div className="text-xs text-foreground/70">
            Instant lessons, worked examples, and quizzes
          </div>
        </div>
      </div>
      <nav className="flex items-center gap-4 text-sm text-foreground/70">
        <a href="#features" className="hover:text-foreground/100">
          Features
        </a>
        <a href="#how" className="hover:text-foreground/100">
          How it works
        </a>
        <a href="#pricing" className="hover:text-foreground/100">
          Pricing
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
