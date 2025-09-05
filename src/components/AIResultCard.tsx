import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, Bot, Sparkles, Search, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface AIResultCardProps {
  provider: "gpt" | "gemini" | "perplexity";
  response: string;
  loading: boolean;
  error?: string | object;
}

const providerConfig = {
  gpt: { name: "GPT-4", icon: Bot, gradient: "bg-gpt-gradient", badge: "ChatGPT", description: "Advanced reasoning and conversation" },
  gemini: { name: "Gemini Pro", icon: Sparkles, gradient: "bg-gemini-gradient", badge: "Google AI", description: "Multimodal AI with deep understanding" },
  perplexity: { name: "Perplexity", icon: Search, gradient: "bg-perplexity-gradient", badge: "Real-time", description: "Search-powered AI with live data" },
};

export const AIResultCard = ({ provider, response, loading, error }: AIResultCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();
  const config = providerConfig[provider];
  const Icon = config.icon;

  const handleCopyResponse = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      toast({ title: "Copied", description: `${config.name} response copied successfully` });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed", description: "Could not copy response", variant: "destructive" });
    }
  };

  const CardUI = (
    <Card className={`${isFullscreen ? "max-h-screen w-full md:w-[90%]" : "min-h-[300px] h-auto"} bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 flex flex-col`}>
      <CardHeader className="pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.gradient}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">{config.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">{config.badge}</Badge>
          <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col overflow-auto">
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">Generating response...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-destructive text-center">{typeof error === "string" ? error : JSON.stringify(error)}</p>
            </div>
          ) : response ? (
            <div className="overflow-auto max-h-[70vh] space-y-3 text-sm leading-relaxed text-foreground/90">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className = "", children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeContent = String(children).replace(/\n$/, "");

                    if (!inline && match) {
                      return (
                        <div className="relative my-2 overflow-x-auto rounded-lg border border-border/50">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2 z-10"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(codeContent);
                                toast({ title: "Copied!", description: `Code block copied from ${config.name}` });
                              } catch {
                                toast({ title: "Failed", description: "Could not copy code", variant: "destructive" });
                              }
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" className="rounded-lg p-3" {...props}>
                            {codeContent}
                          </SyntaxHighlighter>
                        </div>
                      );
                    }
                    return <code className="px-1 py-0.5 rounded text-xs" {...props}>{children}</code>;
                  },
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground text-center">Ready to generate response</p>
            </div>
          )}
        </div>

        {response && !loading && (
          <div className="pt-4 border-t border-border/50 mt-4">
            <Button variant="ghost" size="sm" onClick={handleCopyResponse} className="w-full h-8 text-xs">
              <Copy className="h-3 w-3 mr-2" /> {copied ? "Copied!" : "Copy Full Response"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return isFullscreen ? (
    <div className="fixed inset-0 z-50 flex justify-center items-start bg-background p-6 overflow-auto">
      {CardUI}
    </div>
  ) : <div>{CardUI}</div>;
};
