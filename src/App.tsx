import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import BlogListing from "./pages/BlogListing.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import PostsFeed from "./pages/PostsFeed.tsx";
import PostDetail from "./pages/PostDetail.tsx";
import CoursesListing from "./pages/CoursesListing.tsx";
import CourseDetail from "./pages/CourseDetail.tsx";
import EventsListing from "./pages/EventsListing.tsx";
import EventDetail from "./pages/EventDetail.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogListing />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/posts" element={<PostsFeed />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
            <Route path="/courses" element={<CoursesListing />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/events" element={<EventsListing />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
