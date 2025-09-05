import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "./ChatInterface";
import heroImage from "@/assets/ai-hero.jpg";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const userEmail = localStorage.getItem("userEmail") || "U";
  const navigate = useNavigate();

  // ✅ Free attempts config
  const FREE_LIMIT = 3;

  // ✅ Reset to 0 on refresh
  const [attemptsUsed, setAttemptsUsed] = useState<number>(0);

  // Called by ChatInterface once per successful submit
  const handleAttemptUsed = () => {
    setAttemptsUsed((prev) => Math.min(prev + 1, FREE_LIMIT));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setAttemptsUsed(0); // ✅ reset free searches
    navigate("/login");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-3 h-3 bg-primary rounded-full shadow-glow animate-pulse-glow" />
      </div>
      <div
        className="absolute top-40 right-20 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-2 h-2 bg-ai-secondary rounded-full shadow-glow animate-pulse-glow" />
      </div>
      <div
        className="absolute bottom-32 left-20 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-4 h-4 bg-ai-accent rounded-full shadow-glow animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-6">
          <Badge
            variant="secondary"
            className="text-sm px-4 py-2 bg-card/50 backdrop-blur-sm border-border/50"
          >
            ✨ Powered by GPT-4, Gemini Pro & Perplexity
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-ai-secondary bg-clip-text text-transparent leading-tight">
            All AI Models
            <br />
            <span className="bg-ai-gradient bg-clip-text text-transparent">
              In One Place
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Compare responses from GPT, Gemini, and Perplexity simultaneously.
            Get the best insights from leading AI models with a single query.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="pt-8">
          <ChatInterface
            attemptsUsed={attemptsUsed}
            freeLimit={FREE_LIMIT}
            onAttemptUsed={handleAttemptUsed}
          />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
