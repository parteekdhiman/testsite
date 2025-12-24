import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const courses = [
  {
    badge: "🚀 Advanced Program",
    title: "Full Stack with",
    highlight: "Data Science",
    description: "Master the complete web development stack plus cutting-edge data science technologies. Build intelligent applications with AI/ML integration.",
    techs: [
      { label: "JS", name: "JavaScript", color: "bg-yellow-500/20 text-yellow-400" },
      { label: "Py", name: "Python", color: "bg-blue-500/20 text-blue-400" },
      { label: "ML", name: "Machine Learning", color: "bg-green-500/20 text-green-400" },
      { label: "AI", name: "Artificial Intelligence", color: "bg-purple-500/20 text-purple-400" },
    ],
    skills: ["Frontend Development", "Backend Development", "Data Analysis", "Machine Learning", "AI Integration"],
    gradient: "from-purple-600 via-pink-500 to-orange-400",
  },
  {
    badge: "💻 Core Program",
    title: "Full Stack",
    highlight: "Development",
    description: "Become a complete web developer with expertise in both frontend and backend technologies. Build modern, scalable web applications.",
    techs: [
      { label: "R", name: "React", color: "bg-cyan-500/20 text-cyan-400" },
      { label: "N", name: "Node.js", color: "bg-green-500/20 text-green-400" },
      { label: "M", name: "MongoDB", color: "bg-emerald-500/20 text-emerald-400" },
      { label: "H", name: "HTML/CSS", color: "bg-orange-500/20 text-orange-400" },
    ],
    skills: ["Frontend Frameworks", "Backend APIs", "Database Management", "Cloud Deployment", "Version Control"],
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
  },
  {
    badge: "📊 Analytics Program",
    title: "Data Science",
    highlight: "Tech Stack",
    description: "Master the art of data analysis, machine learning, and AI. Transform raw data into actionable insights and build intelligent systems.",
    techs: [
      { label: "Py", name: "Python", color: "bg-blue-500/20 text-blue-400" },
      { label: "TF", name: "TensorFlow", color: "bg-orange-500/20 text-orange-400" },
      { label: "SK", name: "Scikit-learn", color: "bg-yellow-500/20 text-yellow-400" },
      { label: "PD", name: "Pandas", color: "bg-indigo-500/20 text-indigo-400" },
    ],
    skills: ["Data Analysis", "Machine Learning", "Deep Learning", "Data Visualization", "Statistical Analysis"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    badge: "🎨 Creative Program",
    title: "Graphics &",
    highlight: "Animation",
    description: "Create stunning visual experiences with cutting-edge design tools. Master 3D modeling, animation, and digital art for games, films, and web.",
    techs: [
      { label: "Bl", name: "Blender", color: "bg-orange-500/20 text-orange-400" },
      { label: "Ps", name: "Photoshop", color: "bg-blue-500/20 text-blue-400" },
      { label: "Ae", name: "After Effects", color: "bg-purple-500/20 text-purple-400" },
      { label: "Un", name: "Unity", color: "bg-zinc-500/20 text-zinc-300" },
    ],
    skills: ["3D Modeling", "Motion Graphics", "Digital Art", "Game Design", "Visual Effects"],
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courses.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % courses.length);
      setIsTransitioning(false);
    }, 250);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length);
      setIsTransitioning(false);
    }, 250);
  };

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 250);
  };

  const course = courses[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-hero-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-500 ${
            isTransitioning ? "opacity-0 translate-x-[-30px]" : "opacity-100 translate-x-0"
          }`}
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
              <span className="text-sm text-foreground">{course.badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              {course.title}{" "}
              <span className={`bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent`}>
                {course.highlight}
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {course.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-3">
              {course.techs.map((tech, index) => (
                <div
                  key={index}
                  className={`tech-badge ${tech.color}`}
                >
                  <span className="font-bold">{tech.label}</span>
                  <span className="text-muted-foreground">{tech.name}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary text-primary-foreground">
                <Link to="/courses" className="flex items-center">
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary/50">
                View Curriculum
              </Button>
            </div>
          </div>

          {/* Course Info Card */}
          <div className="hidden lg:block">
            <div className="gradient-border p-6 rounded-2xl glass">
              <h3 className={`text-lg font-semibold mb-4 bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent`}>
                {course.title} {course.highlight}
              </h3>
              <div className="space-y-3">
                {course.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.gradient}`} />
                    <span className="text-sm text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full glass hover:bg-secondary/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {courses.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-gradient-to-r from-primary to-accent"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full glass hover:bg-secondary/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
