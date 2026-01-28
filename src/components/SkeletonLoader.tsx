import { memo } from 'react';

/**
 * Skeleton loader for course detail page
 * Provides visual feedback while content is loading
 */
export const CourseDetailSkeleton = memo(() => (
  <div className="animate-pulse">
    {/* Hero Image Skeleton */}
    <div className="glass rounded-2xl overflow-hidden mb-6 h-72 bg-secondary/50" />

    {/* Title and Meta Skeleton */}
    <div className="mb-6 space-y-3">
      <div className="h-8 bg-secondary/50 rounded-lg w-3/4" />
      <div className="flex gap-4">
        <div className="h-5 bg-secondary/50 rounded-full w-32" />
        <div className="h-5 bg-secondary/50 rounded-full w-24" />
      </div>
    </div>

    {/* Description Skeleton */}
    <div className="space-y-2 mb-8">
      <div className="h-4 bg-secondary/50 rounded-lg w-full" />
      <div className="h-4 bg-secondary/50 rounded-lg w-full" />
      <div className="h-4 bg-secondary/50 rounded-lg w-2/3" />
    </div>

    {/* Content Section Skeleton */}
    <div className="space-y-4 mb-8">
      <div className="h-6 bg-secondary/50 rounded-lg w-48" />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-20 bg-secondary/50 rounded-lg" />
        ))}
      </div>
    </div>

    {/* Sidebar Skeleton */}
    <div className="space-y-6 lg:col-start-3">
      <div className="glass rounded-2xl p-6">
        <div className="h-6 bg-secondary/50 rounded-lg w-32 mb-4" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-5 bg-secondary/50 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  </div>
));

CourseDetailSkeleton.displayName = 'CourseDetailSkeleton';

/**
 * Skeleton loader for course cards
 */
export const CourseCardSkeleton = memo(() => (
  <div className="glass rounded-2xl overflow-hidden animate-pulse">
    {/* Image */}
    <div className="w-full h-48 bg-secondary/50" />

    {/* Content */}
    <div className="p-5">
      <div className="h-4 bg-secondary/50 rounded-lg mb-3 w-24" />
      <div className="h-5 bg-secondary/50 rounded-lg mb-2 w-full" />
      <div className="h-4 bg-secondary/50 rounded-lg mb-4 w-full" />
      <div className="h-5 bg-secondary/50 rounded-lg w-24" />
    </div>
  </div>
));

CourseCardSkeleton.displayName = 'CourseCardSkeleton';

/**
 * Optimized loading indicator
 * Less jarring than traditional spinner
 */
export const SkeletonLoader = memo(({ width = 'w-full', height = 'h-20' }: { width?: string; height?: string }) => (
  <div className={`${width} ${height} bg-secondary/50 rounded-lg animate-pulse`} />
));

SkeletonLoader.displayName = 'SkeletonLoader';
