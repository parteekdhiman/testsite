import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import img from "../assets/Newus_Job_Fiar_Banner.png"

const OneTimePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Show on initial mount only once per page load
    // If user has closed it in this session, keep it closed until refresh
    const hasClosedThisLoad = sessionStorage.getItem("oneTimePopupClosed");
    if (!hasClosedThisLoad) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = (): void => {
    setIsOpen(false);
    sessionStorage.setItem("oneTimePopupClosed", "1");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          aria-label="Close"
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">
            Newus Job Fair 2024
          </h3>
          <img
            src={img}
            alt="Newus Job Fair banner"
            className="w-full h-auto object-contain mb-6 rounded-lg border border-border/50 shadow-sm"
          />
          <div className="flex gap-3 justify-center">
            <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-primary to-pink-600 hover:opacity-90">
              <Link to="/register" onClick={handleClose}>
                Register Now
              </Link>
            </Button>
            <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
              Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneTimePopup;