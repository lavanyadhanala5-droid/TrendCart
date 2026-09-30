import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  RotateCcw, 
  Sparkles, 
  ShoppingBag, 
  ChevronDown, 
  Bot, 
  User, 
  ExternalLink 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const WEBHOOK_URL = 'https://lavanyadhanala5.app.n8n.cloud/webhook/363c57ed-f74b-496b-8a52-067e8610ab61/chat';
const INSTANCE_ID = 'b3bef48f79c158a4106fd7d99f250564dbfa317884d1d58eebd65aec13e32b10';

const SUGGESTED_QUESTIONS = [
  '🏷️ What discount codes can I use?',
  '👗 Recommend bestsellers in Women’s wear',
  '🎧 Tell me about the StudioPro headphones',
  '📦 What are your shipping and return policies?',
];

export const N8nChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  
  // Session ID stored in localStorage for continuity
  const [sessionId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('tc_n8n_session_id');
      if (stored) return stored;
      const newId = 'tc-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('tc_n8n_session_id', newId);
      return newId;
    } catch {
      return 'tc-session-' + Date.now();
    }
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem('tc_n8n_messages');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      {
        id: 'msg-welcome-1',
        sender: 'bot',
        text: 'Hi there! 👋 My name is Nathan, your personal shopping concierge at TrendCart.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: 'msg-welcome-2',
        sender: 'bot',
        text: 'How can I assist you today? Ask me about sizes, styling advice, current promotions, or tracking an order.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync messages with local storage
  useEffect(() => {
    try {
      localStorage.setItem('tc_n8n_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not save chat history to localStorage', e);
    }
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Listen for global open event (e.g. from Contact page button)
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-trendcart-chat', handleOpenChat);
    return () => window.removeEventListener('open-trendcart-chat', handleOpenChat);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Instance-Id': INSTANCE_ID,
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: query,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.output || data.text || data.message || "I'm here to help! Could you please clarify your request?";

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err) {
      console.error('Error contacting n8n chatbot webhook:', err);
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'bot',
        text: "I apologize, but I had trouble connecting to the concierge service just now. Please try asking again in a moment, or reach our support team directly at support@trendcart.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const initialMsgs: ChatMessage[] = [
      {
        id: 'msg-welcome-new',
        sender: 'bot',
        text: 'Conversation reset. How can Nathan assist your shopping experience today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(initialMsgs);
    try {
      localStorage.setItem('tc_n8n_messages', JSON.stringify(initialMsgs));
    } catch {
      // ignore
    }
  };

  // Helper to format basic markdown-like lines
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return <span key={index} className="block h-2" />;
      
      // Simple bold formatting replacement **text**
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="leading-relaxed">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-semibold text-stone-900">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 1. Floating Launcher Button */}
      {!isOpen && (
        <div className="relative group">
          {/* Unread dot */}
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white animate-ping" />
          )}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Chat with Nathan"
            className="flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-stone-700/50"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-amber-400">
                <Bot className="w-4 h-4" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-stone-900" />
            </div>

            <div className="text-left">
              <p className="text-xs font-bold font-display leading-tight flex items-center gap-1.5">
                <span>Chat with Nathan</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </p>
              <p className="text-[10px] text-stone-300 font-normal leading-tight">
                AI Shopping Concierge
              </p>
            </div>
          </button>
        </div>
      )}

      {/* 2. Chat Window Container */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-stone-900 text-white p-4 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-stone-900" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-display flex items-center gap-1.5 text-white">
                  <span>Nathan</span>
                  <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-stone-800 text-amber-300">
                    n8n AI
                  </span>
                </h3>
                <p className="text-[11px] text-stone-400">
                  TrendCart Personal Assistant • Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50/70 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 items-end ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center shrink-0 mb-0.5 shadow-2xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl space-y-1 shadow-2xs ${
                      isUser
                        ? 'bg-stone-900 text-white rounded-br-xs'
                        : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs'
                    }`}
                  >
                    <div className="text-[12px]">
                      {renderFormattedText(msg.text)}
                    </div>
                    <div
                      className={`text-[9px] text-right font-medium ${
                        isUser ? 'text-stone-400' : 'text-stone-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Animation */}
            {isLoading && (
              <div className="flex gap-2.5 items-end justify-start">
                <div className="w-7 h-7 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center shrink-0 mb-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white text-stone-600 px-4 py-3 rounded-2xl rounded-bl-xs border border-stone-200 shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] text-stone-400 ml-1.5">Nathan is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-white border-t border-stone-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full text-[11px] font-medium transition-colors shrink-0 disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Nathan anything..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-stone-100 text-stone-900 placeholder-stone-400 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:ring-1 focus:ring-stone-900 border border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className="px-3 py-1.5 bg-stone-50 border-t border-stone-100 text-[10px] text-stone-400 flex items-center justify-between">
            <span>Powered by n8n Cloud Workflow</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Connected
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
