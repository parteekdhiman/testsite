/**
 * Slug utilities for URL generation and ID extraction
 * Slug format: /courses/:slug-:id
 * ID is the source of truth; slug is cosmetic for humans
 */

/**
 * Generates a URL-friendly slug from a course name
 * - Lowercase
 * - Replace spaces/special chars with hyphens
 * - Remove extra hyphens
 */
export const generateSlug = (courseName: string): string => {
  return courseName
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Creates a full slug URL for a course
 * @param courseId - The numeric course ID (source of truth)
 * @param courseName - The course name for slug generation
 */
export const createCourseSlugUrl = (courseId: number, courseName: string): string => {
  const slug = generateSlug(courseName);
  return `/courses/${slug}-${courseId}`;
};

/**
 * Safely extracts the course ID from a slug URL
 * Handles malformed slugs gracefully
 * @param slug - URL parameter from /courses/:slug
 * @returns Parsed ID or null if invalid
 */
export const extractIdFromSlug = (slug: string | undefined): number | null => {
  if (!slug || typeof slug !== 'string') {
    return null;
  }

  // Extract ID after the last hyphen
  // Format: some-course-name-123
  const lastHyphenIndex = slug.lastIndexOf('-');
  if (lastHyphenIndex === -1) {
    return null;
  }

  const idStr = slug.substring(lastHyphenIndex + 1);
  const id = Number(idStr);

  // Validate: must be a positive integer
  if (!Number.isInteger(id) || id < 0) {
    return null;
  }

  return id;
};

/**
 * Validates if a slug matches the expected format for a course
 * @param slug - URL parameter
 * @param courseId - Expected course ID
 * @param courseName - Expected course name
 * @returns true if slug matches, false if slug should be corrected
 */
export const isValidSlug = (
  slug: string | undefined,
  courseId: number,
  courseName: string
): boolean => {
  if (!slug) return false;

  // Extract ID from slug
  const extractedId = extractIdFromSlug(slug);
  if (extractedId !== courseId) {
    return false;
  }

  // Verify slug prefix matches course name
  const expectedSlug = generateSlug(courseName);
  const actualSlug = slug.substring(0, slug.lastIndexOf('-'));
  
  return actualSlug === expectedSlug;
};

/**
 * Generates the corrected slug URL if current slug is invalid
 * Used for history.replace() to fix malformed URLs
 */
export const getCorrectedSlugUrl = (courseId: number, courseName: string): string => {
  return createCourseSlugUrl(courseId, courseName);
};
