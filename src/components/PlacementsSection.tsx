const placements = [
  {
    name: "Vivek Sharma",
    course: "Banking and Finance",
    company: "Axis Bank (Connaught Place)",
    salary: "20 LPA",
    avatar: "VS",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Rohit Tandon",
    course: "Software Engineering",
    company: "Swiz Bank (London)",
    salary: "40 LPA",
    avatar: "RT",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Shabnam Rana",
    course: "Software Engineering",
    company: "UK",
    salary: "22 LPA",
    avatar: "SR",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Deepali Sharma",
    course: "Software Engineering",
    company: "London",
    salary: "22 LPA",
    avatar: "DS",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Sunil Kumar",
    course: "Software Engineering",
    company: "Singapore",
    salary: "35 LPA",
    avatar: "SK",
    gradient: "from-yellow-500 to-orange-500",
  },
];

const PlacementsSection = () => {
  return (
    <section id="placements" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our Top{" "}
            <span className="gradient-text">Placements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our students are working at top companies worldwide, achieving their career dreams.
          </p>
        </div>

        {/* Scrolling Cards (infinite marquee) */}
        <div className="relative overflow-hidden">
          <div className="marquee">
            <div className="track">
              {[...placements, ...placements].map((placement, index) => (
                <div
                  key={index}
                  className="card flex-shrink-0 w-72 glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${placement.gradient} flex items-center justify-center text-white font-bold`}>
                      {placement.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{placement.name}</h3>
                      <p className="text-sm text-muted-foreground">{placement.course}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{placement.company}</p>
                    <p className={`text-2xl font-display font-bold bg-gradient-to-r ${placement.gradient} bg-clip-text text-transparent`}>
                      {placement.salary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee { overflow: hidden; }
        .track { display: flex; align-items: stretch; gap: 1.5rem; }
        .track .card { flex: 0 0 auto; }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* play and pause on hover */
        .track { animation: marqueeScroll 28s linear infinite; }
        .track:hover { animation-play-state: paused; }

        /* reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .track { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default PlacementsSection;
