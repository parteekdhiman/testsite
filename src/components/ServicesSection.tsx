import { BookOpen, Globe, GraduationCap, Users, Building, Target } from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Training Programs",
    description: "Rigorous training programs that empower individuals with cutting-edge skills and knowledge for the evolving tech landscape.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Building,
    title: "School Solutions",
    description: "Cutting-edge technology and methodologies for educational institutions, fostering creativity and holistic development.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Globe,
    title: "Study Abroad",
    description: "Global opportunities with comprehensive guidance on college selection, applications, and visa strategies.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Newus Recruiters",
    description: "Establishing meaningful connections between talent and leading organizations for career advancement.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: GraduationCap,
    title: "Higher Education",
    description: "Customized guidance on admissions, scholarships, and career path selection for academic success.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Development Center",
    description: "Leadership training, soft skills enhancement, and career counseling for comprehensive personal growth.",
    gradient: "from-pink-500 to-rose-500",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Build Your Career with{" "}
            <span className="gradient-text">Industry-Focused IT Programs</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
