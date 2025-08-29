import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { AIResultCard } from "./AIResultCard";
import { SubscriptionPage } from "./SubscriptionPage";

export interface AIResponse {
  provider: "gpt" | "gemini" | "perplexity";
  response: string;
  loading: boolean;
  error?: string;
}

const API_BASE_URL = "http://localhost:5000";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<AIResponse[]>([
    { provider: "gpt", response: "", loading: false },
    { provider: "gemini", response: "", loading: false },
    { provider: "perplexity", response: "", loading: false },
  ]);

  const [chatCount, setChatCount] = useState(0);
  const [showSubscription, setShowSubscription] = useState(false);
  const FREE_LIMIT = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || chatCount >= FREE_LIMIT) return;

    setResponses((prev) =>
      prev.map((r) => ({ ...r, loading: true, response: "", error: undefined }))
    );

    const providers = ["gpt", "gemini", "perplexity"] as const;

    const apiCalls = providers.map(async (provider) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/${provider}`, { message });
        const resText = response.data.reply || "No response";

        setResponses((prev) =>
          prev.map((r) =>
            r.provider === provider ? { ...r, loading: false, response: resText } : r
          )
        );
      } catch (err: any) {
        setResponses((prev) =>
          prev.map((r) =>
            r.provider === provider
              ? { ...r, loading: false, error: err.response?.data?.error || err.message }
              : r
          )
        );
      }
    });

    await Promise.allSettled(apiCalls);
    setChatCount((prev) => prev + 1);
    setMessage("");
  };

  // Show subscription automatically after free limit
  useEffect(() => {
    if (chatCount >= FREE_LIMIT) {
      setShowSubscription(true);
    }
  }, [chatCount]);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Fixed top-right subscription button */}
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={() => setShowSubscription(true)}>Subscribe</Button>
      </div>

      {/* Show subscription page or chat interface */}
      {showSubscription ? (
        <SubscriptionPage onClose={() => setShowSubscription(false)} />
      ) : (
        <>
          {/* Input + Send button */}
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-2xl mx-auto mb-8">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 h-12"
              disabled={chatCount >= FREE_LIMIT}
            />
            <Button type="submit" disabled={!message.trim() || chatCount >= FREE_LIMIT}>
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
