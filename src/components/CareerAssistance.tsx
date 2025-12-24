import { MessageSquare, Award, Target, Mic } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Interview preparations",
    description: "Take advantage of 1:1 mock interviews with industry professionals.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "Professional branding",
    description: "Enhance your personal brand on your resume and LinkedIn profile.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Target,
    title: "Career counseling",
    description: "Use our career assistance services to figure out your growth trajectory.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Mic,
    title: "Effective communication",
    description: "Build the finest communication skills required to crack the interview.",
    gradient: "from-orange-500 to-red-500",
  },
];

const CareerAssistance = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Career assistance from us to{" "}
            <span className="gradient-text">support your dream</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerAssistance;
