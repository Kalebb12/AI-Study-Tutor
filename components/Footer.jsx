export const Footer = () => {
  return (
    <footer className="mt-12 py-8 text-sm text-foreground/70">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          Made with ❤️ for curious learners.
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/Kalebb12/AI-Study-Tutor" className="hover:text-foreground/100">
            Github
          </a>
          <a href="mailto:2021.cee.jay@gmail.com" className="hover:text-foreground/100">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
