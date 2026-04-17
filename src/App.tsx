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
import LearningPathsListing from "./pages/LearningPathsListing.tsx";
import LearningPathDetail from "./pages/LearningPathDetail.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import SearchPage from "./pages/Search.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminArticles from "./pages/admin/AdminArticles.tsx";
import AdminArticleEditor from "./pages/admin/AdminArticleEditor.tsx";
import AdminPosts from "./pages/admin/AdminPosts.tsx";
import AdminCourses from "./pages/admin/AdminCourses.tsx";
import AdminEvents from "./pages/admin/AdminEvents.tsx";
import AdminLeads from "./pages/admin/AdminLeads.tsx";
import AdminComments from "./pages/admin/AdminComments.tsx";

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
            <Route path="/learning-paths" element={<LearningPathsListing />} />
            <Route path="/learning-paths/:slug" element={<LearningPathDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="articles/:id" element={<AdminArticleEditor />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="comments" element={<AdminComments />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
