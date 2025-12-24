import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { createLazyLoadObserver } from "@/utils/performanceOptimizations";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  onLoadComplete?: () => void;
}

/**
 * OptimizedImage component with lazy loading and blur placeholder
 * Improves performance by deferring image load until visible
 */
export const OptimizedImage = ({
  src,
  alt,
  placeholderSrc,
  onLoadComplete,
  className,
  ...props
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc || src);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = createLazyLoadObserver((entry) => {
      if (entry.target === imgRef.current) {
        setImageSrc(src);
        observer?.unobserve(entry.target);
      }
    });

    if (imgRef.current && observer) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      onLoad={handleImageLoad}
      className={`${className} ${!isLoaded && placeholderSrc ? "blur-sm" : "blur-0"} transition-all duration-300`}
      {...props}
    />
  );
};

export default OptimizedImage;
