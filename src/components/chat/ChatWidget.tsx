"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm the Merch Maverick assistant 👋 I can give you an instant ballpark quote and answer any questions about our products, pricing, or process. What are you looking to order?",
};

const QUICK_REPLIES = [
  "Hotel uniforms & towels",
  "Gym branded apparel",
  "Corporate merchandise",
  "Festival / event merch",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    setShowQuickReplies(false);
    const userMessage: Message = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.filter((m) => m.role !== "assistant" || m !== INITIAL_MESSAGE),
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble right now. Please email us at hello@merchmaverick.com or use the quote tool for an instant estimate.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[90vw] max-w-sm shadow-2xl rounded-2xl overflow-hidden border border-neutral-200 bg-white flex flex-col"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="bg-[#0c1a2e] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2351a4] flex items-center justify-center">
                <span className="text-white text-xs font-bold">MM</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Merch Maverick</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <p className="text-neutral-400 text-xs">AI Assistant · typically replies instantly</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-[#1e3a6e] flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">
                    M
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-[#1e3a6e] text-white rounded-br-sm"
                      : "bg-white text-neutral-700 border border-neutral-100 rounded-bl-sm shadow-sm"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Quick replies */}
            {showQuickReplies && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="px-3 py-1.5 rounded-full bg-white border border-[#2351a4] text-[#2351a4] text-xs font-medium hover:bg-[#f0f6ff] transition-colors"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1e3a6e] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  M
                </div>
                <div className="bg-white border border-neutral-100 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                  <Loader2 size={14} className="text-neutral-400 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quote CTA */}
          <div className="px-4 py-2 bg-[#f0f6ff] border-t border-[#dce9fc]">
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between text-xs text-[#1e3a6e] font-semibold hover:text-[#2351a4] transition-colors"
            >
              <span>Want an exact quote? Use our instant quote tool</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 bg-white border-t border-neutral-100">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm rounded-xl border border-neutral-200 focus:border-[#2351a4] focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-[#1e3a6e] text-white flex items-center justify-center hover:bg-[#142240] disabled:opacity-40 transition-all"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300",
          open ? "bg-neutral-700 scale-95" : "bg-[#1e3a6e] hover:bg-[#142240] pulse-ring"
        )}
        aria-label="Open chat"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ea580c] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
            1
          </span>
        )}
      </button>
    </>
  );
}
