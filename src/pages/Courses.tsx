import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { coursesList } from "../data/coursesList";
import Iridescence from "@/components/ui/Iridescence";
import PageTransition from "@/components/PageTransition";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");

  const courseTypes = ["All", "Programming", "Business", "Design"];

  const filteredCourses = coursesList.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || course.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Group courses by coursetype
  const groupedCourses = {
    Flagship: filteredCourses.filter(
      (course) => course.coursetype === "Flagship"
    ),
    Assistance: filteredCourses.filter(
      (course) => course.coursetype === "Assistance"
    ),
    Short: filteredCourses.filter((course) => course.coursetype === "Short"),
  };

  const courseTypeLabels: Record<
    string,
    { title: string; description: string }
  > = {
    Flagship: {
      title: "Flagship Programs",
      description:
        "Comprehensive long-term programs designed for in-depth skill development and career advancement",
    },
    Assistance: {
      title: "Assistance Programs",
      description:
        "Specialized mid-term courses for skill enhancement and professional growth",
    },
    Short: {
      title: "Short-Term Programs",
      description:
        "Quick-learning programs perfect for skill upskilling and quick career transitions",
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
        <Header />

        {/* Page Header */}
        <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 rounded-full glass text-sm text-primary font-medium mb-4">
              Our Programs
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
              Explore All <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose from our comprehensive range of IT and professional
              courses. From short-term skill programs to comprehensive long-term
              professional courses.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border/50 sticky top-16 md:top-20 glass z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {courseTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={
                    selectedType === type
                      ? "bg-gradient-to-r from-primary to-pink-500 border-0"
                      : "border-border/50 hover:bg-secondary/50"
                  }
                >
                  {type}
                </Button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {Object.entries(groupedCourses).map(
            ([courseType, courses]) =>
              courses.length > 0 && (
                <div key={courseType} className="mb-16">
                  {/* Section Header */}
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                      {courseTypeLabels[courseType].title}
                    </h2>
                    <p className="text-muted-foreground text-base">
                      {courseTypeLabels[courseType].description}
                    </p>
                  </div>

                  {/* Course Count */}
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">
                        {courses.length}
                      </span>{" "}
                      courses available
                    </p>
                  </div>

                  {/* Course Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {courses.map((course, index) => (
                      <CourseCard
                        key={index}
                        course={course}
                        id={coursesList.indexOf(course)}
                      />
                    ))}
                  </div>
                </div>
              )
          )}

          {Object.values(groupedCourses).every(
            (courses) => courses.length === 0
          ) && (
            <div className="text-center py-20">
              <div className="w-16 h-16 glass rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No courses found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-pink-500/20 to-primary/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our counselors are here to help you choose the right course for your
            career goals.
          </p>
          <a
            href="/#contact"
            className="inline-block px-6 py-3 rounded-lg text-white text-lg bg-gradient-to-r from-primary to-pink-500 hover:opacity-90"
          >
            Get Free Counseling
          </a>
        </div>
      </section>

      <Footer />
      </div>
    </PageTransition>
  );
};

export default Courses;
