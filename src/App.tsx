import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SubscriptionPage } from "./components/SubscriptionPage"; // ✅ Import Subscription page
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ChatInterface } from "./components/ChatInterface";


const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = !!localStorage.getItem("user"); // ✅ auth check

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Default → Signup page */}
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Main Page */}
            <Route path="/main" element={isAuthenticated ? <ChatInterface /> : <Signup />} />

            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;