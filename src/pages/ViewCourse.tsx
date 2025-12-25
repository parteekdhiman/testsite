import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { coursesList } from "@/data/coursesList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import {
  Clock,
  Download,
  X,
  Code,
  Database,
  Zap,
  Layers,
  GitBranch,
  Shield,
  PieChart,
  Brain,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { submitCourseInquiry } from "@/utils/apiService";
import { log } from "console";

// Icon mapping for skills
const skillIconMap: Record<string, React.ReactNode> = {
  // Frontend
  HTML5: <Code className="w-4 h-4" />,
  CSS3: <Layers className="w-4 h-4" />,
  JavaScript: <Zap className="w-4 h-4" />,
  Reactjs: <Zap className="w-4 h-4" />,
  "React.js": <Zap className="w-4 h-4" />,
  // Backend
  "Node js": <Code className="w-4 h-4" />,
  "Express js": <Code className="w-4 h-4" />,
  Python: <Code className="w-4 h-4" />,
  php: <Code className="w-4 h-4" />,
  Django: <Code className="w-4 h-4" />,
  Laravel: <Code className="w-4 h-4" />,
  // Database
  MongoDB: <Database className="w-4 h-4" />,
  SQL: <Database className="w-4 h-4" />,
  Mysql: <Database className="w-4 h-4" />,
  PostgreSQL: <Database className="w-4 h-4" />,
  // Version Control
  "Git & GitHub": <GitBranch className="w-4 h-4" />,
  Git: <GitBranch className="w-4 h-4" />,
  Github: <GitBranch className="w-4 h-4" />,
  // Data Science
  "Machine Learning": <Brain className="w-4 h-4" />,
  "Deep Learning": <Brain className="w-4 h-4" />,
  "Data Science": <PieChart className="w-4 h-4" />,
  "Python for Data Science": <Brain className="w-4 h-4" />,
  // Security
  "Kali Linux": <Shield className="w-4 h-4" />,
  "Ethical Hacking": <Shield className="w-4 h-4" />,
};

const getIconForSkill = (skill: string): React.ReactNode => {
  return skillIconMap[skill] || <Code className="w-4 h-4" />;
};

const ViewCourse = () => {
  const params = useParams();
  const id = Number(params.id);
  const course = coursesList[id];
  const { toast } = useToast();
  const [showBrochureForm, setShowBrochureForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBrochureDownload = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await submitCourseInquiry({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: course.name,
      });
      console.log('submitCourseInquiry response:', data);
      if (data && data.ok) {
        toast({
          title: "Thank You! 🎉",
          description:
            "Your brochure is ready for download.",
        });

        // Download the brochure directly on client browser if URL is provided
        if (course.brochure) {
          try {
            const urlObj = new URL(course.brochure);
            const sameOrigin = urlObj.origin === window.location.origin;

            const a = document.createElement("a");
            a.href = course.brochure;
            a.target = "_blank";
            a.rel = "noopener noreferrer";

            // Only set download attribute for same-origin URLs (browsers restrict cross-origin downloads)
            if (sameOrigin) {
              a.download = `${course.name}-brochure.pdf`;
            }

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } catch (err) {
            console.error('Brochure download error:', err);
            // fallback: open in new tab
            window.open(course.brochure, '_blank', 'noopener');
          }
        }

        // Reset form and close modal
        setFormData({ name: "", email: "", phone: "" });
        setShowBrochureForm(false);
      } else {
        // Ensure user sees an error if backend responded but `ok` is falsy
        toast({
          title: "Download Failed",
          description: "Unable to process your request. Please try again later.",
          variant: "destructive",
        });
        console.warn('submitCourseInquiry returned no ok flag or failed', data);
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      toast({
        title: "Submission Failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to process your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log(course.brochure)

  // Recommendations: prefer same `type`, then same `coursetype`, exclude current
  const getRecommendations = (currentCourse: typeof course, max = 4) => {
    if (!currentCourse) return [];
    const sameType = coursesList.filter(
      (c) => c.type === currentCourse.type && c.name !== currentCourse.name
    );
    const sameCourseType = coursesList.filter(
      (c) =>
        c.coursetype === currentCourse.coursetype &&
        c.name !== currentCourse.name
    );

    const combined: typeof coursesList = [] as any;
    // add from sameType first
    sameType.forEach((c) => combined.push(c));
    // then add from sameCourseType if not already present
    sameCourseType.forEach((c) => {
      if (!combined.find((x) => x.name === c.name)) combined.push(c);
    });
    // finally fill with other courses if needed
    coursesList.forEach((c) => {
      if (combined.length >= max) return;
      if (c.name === currentCourse.name) return;
      if (!combined.find((x) => x.name === c.name)) combined.push(c);
    });

    return combined.slice(0, max);
  };

  if (!course) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Course not found
            </h2>
            <p className="text-muted-foreground mb-6">
              The course you are looking for does not exist.
            </p>
            <Link to="/courses">
              <Button className="bg-gradient-to-r from-primary to-pink-500">
                Back to Courses
              </Button>
            </Link>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
       <main className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl overflow-hidden mb-6">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-72 object-cover"
              />
            </div>

            <h1 className="text-3xl font-display font-bold mb-3 text-foreground">
              {course.name}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
              <Badge className="ml-2 bg-gradient-to-r from-primary to-pink-500 text-white border-0">
                {course.coursetype}
              </Badge>
            </div>

            <p className="text-muted-foreground mb-6">{course.description}</p>

            <h3 className="font-display font-semibold text-xl mb-3">
              What you'll learn
            </h3>
            <div className="space-y-4 mb-8">
              {course.content.map((block, idx) =>
                typeof block === "string" ? (
                  <div
                    key={idx}
                    className="glass rounded-xl p-4 text-muted-foreground"
                  >
                    {block}
                  </div>
                ) : (
                  <div key={idx} className="glass rounded-xl p-4">
                    <h4 className="font-medium text-foreground mb-3">
                      {block.head}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {block.points.map((p, i) => (
                        <div
                          key={i}
                          className="bg-secondary/50 rounded-lg p-3 text-sm text-muted-foreground border border-border/30 flex items-center gap-2 hover:bg-secondary/70 transition-colors"
                        >
                          <span className="text-primary shrink-0">
                            {getIconForSkill(p)}
                          </span>
                          <span className="line-clamp-2">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h4 className="font-display font-semibold text-lg mb-3">
                Course Details
              </h4>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li>
                  <strong className="text-foreground">Duration:</strong>{" "}
                  {course.duration}
                </li>
                <li>
                  <strong className="text-foreground">Type:</strong>{" "}
                  {course.type}
                </li>
                <li>
                  <strong className="text-foreground">
                    Placement Support:
                  </strong>{" "}
                  {course.placement ? "Yes" : "No"}
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg mb-3">
                Outcome
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                {course.outcome}
              </p>

              <div className="flex flex-col gap-3">
                <Link to="/contact">
                  <Button className="w-full bg-gradient-to-r from-primary to-pink-500">
                    Enquire Now
                  </Button>
                </Link>
                {course.brochure && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowBrochureForm(true)}
                  >
                    <Download className="w-4 h-4 mr-2" /> Brochure
                  </Button>
                )}
              </div>
            </div>

            {/* Courses Tools */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg mb-3">Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {course.tools.length > 0 ? (
                  course.tools.map((t: any, i: number) => (
                    <div
                      key={i}
                      className="group relative animate-fade-in"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      {/* Tooltip */}
                      {t.type && (
                        <div
                          className="
                              pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2
                              whitespace-nowrap
                              rounded-lg px-3 py-1.5 text-xs
                              bg-black/80 text-white
                              opacity-0 scale-95
                              group-hover:opacity-100 group-hover:scale-100
                              transition-all duration-200
                              shadow-lg z-50
                              "
                        >
                          {t.type}
                        </div>
                      )}
                      {/* Badge */}
                      <Badge
                        className="relative h-full min-h-[64px] flex items-center justify-center gap-4 px-4 py-3rounded-xl bg-white/10 backdrop-blur-md
                                  border border-white/15
                                  shadow-md
                                  transition-all duration-300
                                  hover:scale-[1.06]
                                  hover:border-white/40
                                  hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]
                                  "
                      >
                        {/* Glow */}
                        <span
                          className="
              absolute inset-0 rounded-xl opacity-0
              bg-gradient-to-r from-indigo-500/20 via-pink-500/20 to-red-500/20
              blur-xl
              group-hover:opacity-100
              transition-opacity duration-300
            "
                        />
                        {/* Icon */}
                        <span
                          className="
              relative
              w-12 h-12
              flex items-center justify-center
              rounded-full
              bg-white
              shadow-md
              shrink-0
              transition-transform duration-300
              group-hover:scale-110
            "
                        >
                          <span className="w-7 h-7 flex items-center justify-center text-black">
                            {t.img}
                          </span>
                        </span>
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div
                    className="
        col-span-3
        px-4 py-2 rounded-xl
        bg-white/5 border border-white/10
        text-sm italic text-muted-foreground
       "
                  >
                    Listed inside content sections
                  </div>
                )}
              </div>
            </div>
            {/* Recommended Courses Card */}
            <div className="glass rounded-2xl p-6">
              <h4 className="font-display font-semibold text-lg mb-3">
                Recommended Courses
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Courses you may also like based on this program.
              </p>
              <div className="space-y-3">
                {getRecommendations(course, 4).map((rec, idx) => {
                  const recIndex = coursesList.findIndex(
                    (c) => c.name === rec.name
                  );
                  return (
                    <Link
                      to={`/courses/${recIndex}`}
                      key={idx}
                      className="block"
                    >
                      <div className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-secondary/40 transition-all">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-md bg-gradient-to-r from-primary to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                            {rec.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {rec.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {rec.type} • {rec.coursetype}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-primary">View →</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>
      </div>

      {/* Brochure Download Form Modal */}
      {showBrochureForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-semibold text-xl text-foreground">
                Download Brochure
              </h3>
              <button
                onClick={() => setShowBrochureForm(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-muted-foreground text-sm mb-6">
              Please fill in your details to download the {course.name}{" "}
              brochure.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowBrochureForm(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-primary to-pink-500"
                onClick={handleBrochureDownload}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" /> Download
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </PageTransition>
  );
};

export default ViewCourse;
