import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/data/coursesList";

interface CourseCardProps {
  course: Course;
  featured?: boolean;
  id?: number;
}

const typeGradients: Record<string, string> = {
  Programming: "from-purple-500 to-pink-500",
  Business: "from-cyan-500 to-blue-500",
  Design: "from-orange-500 to-red-500",
};

const CourseCard = ({ course, featured = false, id = 0 }: CourseCardProps) => {
  const gradient = typeGradients[course.type] || "from-primary to-pink-500";

  

  return (
    <div className="group glass rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className={`bg-gradient-to-r ${gradient} text-white border-0`}>
            {course.type}
          </Badge>
          {course.coursetype === "Flagship" && (
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Flagship
            </Badge>
          )}
        </div>
        
        {course.placement && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              100% Job Assistance
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Clock className="w-4 h-4" />
          <span>{course.duration}</span>
        </div>
        
        <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        {course.tools && course.tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.tools.slice(0, 6).map((tool: any, idx: number) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                title={tool.type}
              >
                <span className="w-4 h-4 flex items-center justify-center text-xs">
                  {tool.img}
                </span>
              </div>
            ))}
            {course.tools.length > 6 && (
              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-xs font-semibold text-foreground">
                +{course.tools.length - 6}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Link to={`/courses/${id ?? 0}`} className="flex-1">
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
    </div>
  );
};

export default CourseCard;
