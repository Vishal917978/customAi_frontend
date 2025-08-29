import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { AIResultCard } from "./AIResultCard";
import { useNavigate } from "react-router-dom";

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
  const FREE_LIMIT = 3;

  const navigate = useNavigate(); // ✅ React Router navigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (chatCount >= FREE_LIMIT) {
      alert("❌ Free chat limit reached! Please upgrade to continue.");
      return;
    }

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
            r.provider === provider
              ? { ...r, loading: false, response: resText }
              : r
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
  };

  const handleUpgradeClick = () => {
    navigate("/subscription"); // ✅ Navigate to Subscription page
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Input box + Search button */}
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

      {/* Free limit reached card */}
      {chatCount >= FREE_LIMIT ? (
        <div className="p-6 bg-yellow-100 border border-yellow-300 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2">Free Limit Reached</h3>
          <p className="text-sm mb-4">
            You have used your {FREE_LIMIT} free chats. Please upgrade to continue chatting.
          </p>
          <Button className="w-full" onClick={handleUpgradeClick}>
            Upgrade Now
          </Button>
        </div>
      ) : (
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
      )}
    </div>
  );
};