import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // 🔹 Auto scroll on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // use "smooth" if you want animation
    });
  }, [pathname]);

  // 🔹 Toggle button visibility on scroll
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

  return (
    visible && (
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="
          fixed bottom-6 right-2 z-50
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
    )
  );
};

export default ScrollToTop;
