import { coursesList, Course } from "@/data/coursesList";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Common course-related questions and patterns
const questionPatterns = {
  coursesByType: /courses?\s+(in|about|for)\s+(\w+)/i,
  coursesByName: /tell\s+me\s+about\s+(\w+(?:\s+\w+)*)/i,
  duration: /how\s+long|duration|how\s+many\s+hours/i,
  placement: /placement|job|career/i,
  flagship: /flagship|best|top|comprehensive/i,
  shortCourses: /short|quick|fast|2\s+month|45\s+days/i,
  assistance: /assistance|intermediate|mid-term/i,
  allCourses: /all\s+courses|what\s+courses|list\s+courses/i,
  tools: /tools|technologies|skills|learn/i,
  outcome: /outcome|after\s+course|what\s+will\s+i\s+learn|skills/i,
};

export const generateChatbotResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Check for greeting
  if (/^(hi|hello|hey|greetings)$/i.test(lowerMessage)) {
    return "👋 Hello! Welcome to NEWUS Learner Hub! I'm here to help you learn about our courses. What would you like to know? You can ask about:\n- Specific courses\n- Course types (Flagship, Assistance, Short)\n- Placement opportunities\n- Course duration\n- Skills you'll learn";
  }

  // Check for all courses
  if (questionPatterns.allCourses.test(lowerMessage)) {
    return generateAllCoursesResponse();
  }

  // Check for flagship courses
  if (questionPatterns.flagship.test(lowerMessage)) {
    return generateCourseTypeResponse("Flagship");
  }

  // Check for short courses
  if (questionPatterns.shortCourses.test(lowerMessage)) {
    return generateCourseTypeResponse("Short");
  }

  // Check for assistance courses
  if (questionPatterns.assistance.test(lowerMessage)) {
    return generateCourseTypeResponse("Assistance");
  }

  // Check for specific course inquiry
  const courseMatch = userMessage.match(questionPatterns.coursesByName);
  if (courseMatch) {
    const courseName = courseMatch[1];
    return findAndDescribeCourse(courseName);
  }

  // Check for courses by type (Programming, Business, Design)
  const typeMatch = userMessage.match(questionPatterns.coursesByType);
  if (typeMatch) {
    const courseType = typeMatch[2];
    return findCoursesByType(courseType);
  }

  // Check for placement-related questions
  if (questionPatterns.placement.test(lowerMessage)) {
    return generatePlacementResponse();
  }

  // Check for duration questions
  if (questionPatterns.duration.test(lowerMessage)) {
    return generateDurationResponse();
  }

  // Default response
  return generateDefaultResponse();
};

const generateAllCoursesResponse = (): string => {
  const flagship = coursesList.filter((c) => c.coursetype === "Flagship");
  const assistance = coursesList.filter((c) => c.coursetype === "Assistance");
  const short = coursesList.filter((c) => c.coursetype === "Short");

  return `📚 Here's an overview of our courses:\n\n🏆 **Flagship Programs (${flagship.length}):**\n${flagship
    .map((c) => `• ${c.name}`)
    .join("\n")}\n\n💼 **Assistance Programs (${assistance.length}):**\n${assistance
    .map((c) => `• ${c.name}`)
    .join("\n")}\n\n⚡ **Short-Term Programs (${short.length}):**\n${short
    .map((c) => `• ${c.name}`)
    .join("\n")}\n\nWant to know more about any specific course?`;
};

const generateCourseTypeResponse = (courseType: string): string => {
  const courses = coursesList.filter((c) => c.coursetype === courseType);

  if (courses.length === 0) {
    return `Sorry, I couldn't find any ${courseType} courses.`;
  }

  const descriptions = courses
    .map(
      (c) =>
        `• **${c.name}** (${c.duration})\n  ${c.description.substring(0, 100)}...`
    )
    .join("\n\n");

  return `${courseType} Courses (${courses.length}):\n\n${descriptions}\n\nWould you like more details about any of these courses?`;
};

const findAndDescribeCourse = (searchTerm: string): string => {
  const course = coursesList.find(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!course) {
    return `I couldn't find a course matching "${searchTerm}". Try searching for:\n- Programming\n- Data Science\n- Web Development\n- Design\n- Business\n\nOr ask about "all courses" to see the complete list.`;
  }

  return `📖 **${course.name}**\n\n**Duration:** ${course.duration}\n**Type:** ${course.type} - ${course.coursetype}\n\n**Description:**\n${course.description}\n\n**What You'll Learn:**\n${course.outcome}\n\n${course.placement ? "✅ **Placement Assistance:** Yes" : "⏳ **Placement Assistance:** Not included"}\n\nWant to know more details or ready to enroll?`;
};

const findCoursesByType = (typeQuery: string): string => {
  const type = typeQuery.toLowerCase();
  const courses = coursesList.filter(
    (c) =>
      c.type.toLowerCase().includes(type) ||
      c.name.toLowerCase().includes(type)
  );

  if (courses.length === 0) {
    return `I didn't find courses matching "${typeQuery}". Available course categories are:\n• Programming\n• Business\n• Design\n\nTry asking about any of these!`;
  }

  const list = courses
    .map(
      (c) =>
        `• **${c.name}** (${c.duration}) - ${c.coursetype}\n  Placement: ${c.placement ? "Yes ✅" : "No"}`
    )
    .join("\n\n");

  return `Found ${courses.length} courses in ${typeQuery}:\n\n${list}\n\nWould you like more information about any of these?`;
};

const generatePlacementResponse = (): string => {
  const placementCourses = coursesList.filter((c) => c.placement);
  const noCourses = coursesList.filter((c) => !c.placement);

  return `💼 **Placement Opportunities:**\n\n✅ **${placementCourses.length} Courses with Placement Assistance:**\n${placementCourses
    .map((c) => `• ${c.name}`)
    .join("\n")}\n\n⏳ **${noCourses.length} Courses without Placement:**\n${noCourses
    .map((c) => `• ${c.name}`)
    .join("\n")}\n\nAsk me about any specific course to learn more about its placement support!`;
};

const generateDurationResponse = (): string => {
  const byDuration = coursesList.reduce(
    (acc, course) => {
      const dur = course.duration;
      if (!acc[dur]) {
        acc[dur] = [];
      }
      acc[dur].push(course.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const list = Object.entries(byDuration)
    .map(([duration, courses]) => `**${duration}:**\n${courses.map((c) => `• ${c}`).join("\n")}`)
    .join("\n\n");

  return `⏱️ **Course Durations:**\n\n${list}\n\nLooking for a specific duration?`;
};

const generateDefaultResponse = (): string => {
  return `I'm here to help with course information! You can ask me:\n\n• "Tell me about [course name]"\n• "What are flagship courses?"\n• "Show me short-term courses"\n• "Which courses have placement?"\n• "Programming courses"\n• "Design courses"\n• "How long are the courses?"\n\nWhat would you like to know?`;
};
