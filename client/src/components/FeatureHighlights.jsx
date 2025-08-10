export default function FeatureHighlights() {
  return (
    <section className="bg-emerald-50 py-16 px-6 rounded-xl shadow-inner">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-green-900">Why Choose StudBuddy?</h2>
        <p className="text-green-700 mt-2 max-w-xl mx-auto">
          Everything you need to stay organized, motivated, and on track with your studies.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {[
          {
            icon: "📅",
            title: "Plan",
            desc: "Schedule sessions and set clear goals to maximize your productivity.",
          },
          {
            icon: "📊",
            title: "Track",
            desc: "Monitor your progress in real time and stay motivated along the way.",
          },
          {
            icon: "📝",
            title: "Reflect",
            desc: "Review your notes and reflect on what you’ve learned after each session.",
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-all"
          >
            <div className="text-6xl mb-6">{icon}</div>
            <h3 className="text-2xl font-semibold text-green-900 mb-3">{title}</h3>
            <p className="text-green-700 max-w-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
