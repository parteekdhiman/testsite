import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="
        fixed bottom-6 right-6 z-50
        h-12 w-12
        flex items-center justify-center
        rounded-full
        bg-white/90 backdrop-blur-md
        border border-white/30
        shadow-lg
        transition-all duration-300
        hover:scale-110
        hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]
        active:scale-95
      "
    >
      <ChevronUp className="h-6 w-6 text-black" />
    </button>
  );
};

export default ScrollToTop;
