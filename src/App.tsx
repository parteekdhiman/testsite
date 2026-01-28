import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, memo } from "react";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./pages/ScrollToTop";
import OneTimePopup from "./components/OneTimePopup";
import ErrorBoundary from "./components/ErrorBoundary";
// import LandingSnow from "./components/LandingSnow";

// Lazy load pages for better code splitting
const Index = lazy(() => import("./pages/Index"));
const Courses = lazy(() => import("./pages/Courses"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ViewCourse = lazy(() => import("./pages/ViewCourse"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ApiTest = lazy(() => import("./pages/ApiTest"));
const IFS = lazy(() => import("./pages/IFS"));

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
));

LoadingFallback.displayName = 'LoadingFallback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ScrollToTop />
          <OneTimePopup/>
          {/* <LandingSnow /> */}
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* Slug-based routing: /courses/course-name-123 (slug is cosmetic, ID is source of truth) */}
              <Route path="/courses/:slug" element={<ViewCourse />} />
              {/* Legacy ID-only routing kept for backward compatibility */}
              <Route path="/courses/:id" element={<ViewCourse />} />
              <Route path="/api-test" element={<ApiTest />} />
              <Route path="/ifs" element={<IFS />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default memo(App);
