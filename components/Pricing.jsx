const Pricing = () => {
  return (
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
  );
}
 
export default Pricing;