import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ChatInterface } from "./components/ChatInterface";
import { HeroSection } from "./components/HeroSection";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default: open signup first */}
          <Route path="/" element={<Navigate to="/signup" replace />} />

          {/* Signup → goes to login after success */}
          <Route path="/signup" element={<Signup />} />

          {/* Login → goes to main after success */}
          <Route path="/login" element={<Login />} />

          {/* Protected main page */}
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <HeroSection/>
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
