import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { coursesList } from "@/data/coursesList";

const FeaturedCourses = () => {
  const featuredCourses = coursesList
    .filter((course) => course.slider || course.coursetype === "Flagship")
    .slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Specialized{" "}
              <span className="gradient-text">Program for Career</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Industry-focused courses designed to make you job-ready with
              practical skills and real-world projects.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-border/50 hover:bg-secondary/50"
            asChild
          >
            <Link to="/courses">
              View All Courses
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <CourseCard key={index} course={course} featured />
          ))}
        </div>
        <div className="flex justify-center w-48 mx-auto">
        <Link to={`/courses`} className="flex-1 mt-10 mx-auto w-max">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center bg-gradient-to-r from-primary to-pink-500 hover:opacity-90"
          >
            View course
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
