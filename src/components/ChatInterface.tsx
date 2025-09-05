import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { AIResultCard } from "./AIResultCard";
import { SubscriptionPage } from "./SubscriptionPage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export interface AIResponse {
  provider: "gpt" | "gemini" | "perplexity";
  response: string;
  loading: boolean;
  error?: string;
}

const API_BASE_URL = "http://localhost:5000";

interface ChatInterfaceProps {
  attemptsUsed: number;
  freeLimit: number;
  onAttemptUsed: () => void; // <-- call this once per submit
}

export const ChatInterface = ({
  attemptsUsed,
  freeLimit,
  onAttemptUsed,
}: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<AIResponse[]>([
    { provider: "gpt", response: "", loading: false },
    { provider: "gemini", response: "", loading: false },
    { provider: "perplexity", response: "", loading: false },
  ]);

  const [showSubscription, setShowSubscription] = useState(false);

  const email = localStorage.getItem("userEmail") || "User";
  const avatarLetter = email.charAt(0).toUpperCase();

  useEffect(() => {
    setShowSubscription(attemptsUsed >= freeLimit);
  }, [attemptsUsed, freeLimit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (attemptsUsed >= freeLimit) {
      setShowSubscription(true);
      return;
    }

    // mark loading
    setResponses((prev) =>
      prev.map((r) => ({ ...r, loading: true, response: "", error: undefined }))
    );

    const providers = ["gpt", "gemini", "perplexity"] as const;

    const apiCalls = providers.map(async (provider) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/${provider}`, {
          message,
        });
        const resText = response.data?.reply ?? "No response";

        setResponses((prev) =>
          prev.map((r) =>
            r.provider === provider
              ? { ...r, loading: false, response: resText }
              : r
          )
        );
      } catch (err: any) {
        setResponses((prev) =>
          prev.map((r) =>
            r.provider === provider
              ? {
                  ...r,
                  loading: false,
                  error:
                    err?.response?.data?.error ||
                    err?.message ||
                    "Request failed",
                }
              : r
          )
        );
      }
    });

    await Promise.allSettled(apiCalls);

    onAttemptUsed();
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.reload();
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Fixed top-right controls (Subscribe + Profile) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <Button onClick={() => setShowSubscription(true)}>Subscribe</Button>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>{avatarLetter}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              Searches used: {attemptsUsed}/{freeLimit}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Show subscription page or chat interface */}
      {showSubscription ? (
        <SubscriptionPage onClose={() => setShowSubscription(false)} />
      ) : (
        <>
          {/* Input + Send button */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 max-w-2xl mx-auto mb-8"
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Ask anything... (${freeLimit - attemptsUsed} free left)`}
              className="flex-1 h-12"
              disabled={attemptsUsed >= freeLimit}
            />
            <Button
              type="submit"
              disabled={!message.trim() || attemptsUsed >= freeLimit}
              title={attemptsUsed >= freeLimit ? "Free limit reached" : "Send"}
            >
              {responses.some((r) => r.loading) ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>

          {/* AI responses */}
          <div className="grid md:grid-cols-3 gap-6">
            {responses.map((r) => (
              <AIResultCard
                key={r.provider}
                provider={r.provider}
                response={r.response}
                loading={r.loading}
                error={r.error}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
