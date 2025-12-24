import { useLocation } from "react-router-dom";
import SnowfallEffect from "./SnowfallEffect";

const LandingSnow: React.FC = () => {
  const { pathname } = useLocation();

  // Only show on landing page
  if (pathname !== "/") return null;

  return <SnowfallEffect />;
};

export default LandingSnow;
