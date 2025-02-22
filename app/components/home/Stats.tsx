'use client';
const Stats = () => {
  const stats = [
    { number: "70%", label: "Time Saved" },
    { number: "99%", label: "Accuracy Rate" },
    { number: "24/7", label: "Availability" },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;