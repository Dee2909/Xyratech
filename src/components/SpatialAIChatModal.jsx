import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, RefreshCw, Sparkles, User } from 'lucide-react';
import { sound } from '../utils/audio';

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Greetings. I am Xyra Assistant, connected to XYRA TECH's autonomous intelligence engine. You can ask me anything about our 8 synchronized digital services, tech stacks, or SLAs.",
    time: 'Just now'
  }
];

export default function SpatialAIChatModal({ onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const query = text || input;
    if (!query.trim()) return;

    sound.playClick();
    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!text) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      sound.playBeacon();
      let botReply = '';
      const q = query.toLowerCase();

      if (q.includes('chatbot') || q.includes('ai') || q.includes('automation')) {
        botReply = "Our AI Chatbot Development service builds custom RAG knowledge bases, LLM fine-tuned conversational assistants, and autonomous workflow bots integrated with WhatsApp, Slack, and enterprise portals with complete data isolation.";
      } else if (q.includes('web') || q.includes('app') || q.includes('mobile')) {
        botReply = "We engineer modern cloud-native Web Platforms (React, Next.js, Node.js) and native mobile applications (iOS Swift, Android Kotlin, and Flutter cross-platform) optimized for sub-second response times.";
      } else if (q.includes('shoot') || q.includes('ad') || q.includes('marketing') || q.includes('media')) {
        botReply = "XYRA TECH bridges creative production and growth marketing! We shoot 4K/8K commercial ads, drone cinematography, and product films, then scale them through Meta, Google, and TikTok performance marketing.";
      } else if (q.includes('site') || q.includes('management') || q.includes('sla')) {
        botReply = "Our Site & Service Management delivers a guaranteed 99.99% uptime SLA, 24/7/365 synthetic telemetry monitoring, zero-downtime rollouts, and a 15-minute emergency response SLA.";
      } else {
        botReply = `Regarding "${query}": XYRA TECH provides 8 synchronized digital services under the ethos Ideas • Technology • Growth. Would you like to lock this into a project consultation?`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Xyra Assistant Terminal</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">XYRA TECH Conversational AI</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              title="Reset"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 cyber-dots">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                <span className="text-[10px] block mt-1 opacity-60 text-slate-400">
                  {m.time}
                </span>
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-pink-400">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Xyra Assistant synthesizing response...</span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Web, Apps, AI, Shoots, Marketing, SLAs..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
