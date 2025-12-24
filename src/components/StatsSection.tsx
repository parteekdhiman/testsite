import { GraduationCap, Briefcase, Award, Handshake } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: GraduationCap,
      value: "74,000+",
      label: "Total Students",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Briefcase,
      value: "12,000+",
      label: "Placed Students",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Award,
      value: "27+",
      label: "Years of Experience",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Handshake,
      value: "111+",
      label: "Hiring Partners",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className={`text-3xl md:text-4xl font-display font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
