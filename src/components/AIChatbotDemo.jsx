import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Hello! I am Xyra Assistant, powered by XYRA TECH's AI Chatbot & Business Automation engine. You can ask me about our 8 synchronized digital services, pricing estimations, or technical SLAs.",
    time: 'Just now'
  }
];

const SUGGESTED_QUERIES = [
  'What does your AI Chatbot service include?',
  'How do you engineer Web & Mobile platforms?',
  'What is your Site & Service Management SLA?',
  'Can you manage our Ad Shoots and Digital Marketing together?'
];

export default function AIChatbotDemo() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = '';
      const q = query.toLowerCase();

      if (q.includes('chatbot') || q.includes('ai') || q.includes('automation')) {
        botReply = "Our AI Chatbot Development service builds custom RAG (Retrieval-Augmented Generation) knowledge bases, LLM fine-tuned conversational assistants, and automated multi-step operations workflows. We integrate seamlessly with WhatsApp, Slack, Zendesk, and enterprise web/mobile platforms with guaranteed data privacy.";
      } else if (q.includes('web') || q.includes('app') || q.includes('ios') || q.includes('android')) {
        botReply = "We specialize in modern Web Development (React, Next.js, Cloud-Native architectures) and Application Development (Native iOS with Swift, Android with Kotlin, and cross-platform Flutter). We ensure offline sync, sub-second load times, and App Store / Play Store certification.";
      } else if (q.includes('site') || q.includes('management') || q.includes('sla') || q.includes('uptime')) {
        botReply = "Our Site & Service Management delivers a guaranteed 99.99% uptime SLA with 24/7/365 synthetic telemetry monitoring, zero-downtime automated deployment pipelines, disaster recovery, SSL governance, and a sub-15-minute emergency response SLA.";
      } else if (q.includes('shoot') || q.includes('ad') || q.includes('marketing') || q.includes('media')) {
        botReply = "XYRA TECH bridges creative production and digital distribution! We shoot 4K/8K commercial ads, product films, and aerial drone footage, and scale them through performance marketing campaigns across Meta, Google, and TikTok to maximize your ROAS.";
      } else if (q.includes('data') || q.includes('analytics')) {
        botReply = "Our Data Analysis service transforms multi-channel customer and transactional data into real-time executive BI dashboards, automated ETL pipelines, churn prediction models, and actionable business insights.";
      } else {
        botReply = `Thank you for asking about "${query}". At XYRA TECH, we provide 8 synchronized digital services: Web Development, Application Development, AI Chatbot Development, Media Tech Support, Site & Service Management, Data Analysis, Ad Shoots, and Digital Marketing. Would you like to schedule an architectural consultation?`;
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
    }, 600);
  };

  return (
    <section id="ai-demo" className="relative px-4 py-20 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono shadow-sm">
            <Bot className="w-3.5 h-3.5 text-sky-600" />
            <span>LIVE CONVERSATIONAL AI DEMO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Interactive AI <br />
            Chatbot Demo
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Experience our conversational AI capabilities firsthand. We engineer autonomous enterprise assistants capable of answering inquiries, executing database workflows, qualifying leads, and resolving tickets 24/7.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Domain Knowledge Vector Ingestion (RAG)</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Sub-second streaming token response time</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Secure isolated cloud or on-premise deployments</span>
            </div>
          </div>

          {/* Quick Query Pills */}
          <div className="pt-2">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-2 font-medium">
              Try Sample Inquiries:
            </span>
            <div className="flex flex-col gap-2">
              {SUGGESTED_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="text-left text-xs px-3.5 py-2.5 rounded-xl bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200 hover:border-sky-300 transition-all flex items-center justify-between shadow-sm"
                >
                  <span>{q}</span>
                  <Sparkles className="w-3 h-3 text-sky-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Clean White & Sky Blue Chat Interface */}
        <div className="lg:col-span-7 w-full">
          <div className="rounded-3xl border border-sky-100 bg-white shadow-[0_15px_35px_-5px_rgba(14,165,233,0.14)] overflow-hidden flex flex-col h-[520px]">
            {/* Chat Header */}
            <div className="p-4 bg-sky-50/90 border-b border-sky-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Xyra Assistant</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">XYRA TECH Conversational Engine</p>
                </div>
              </div>

              <button
                onClick={() => setMessages(INITIAL_MESSAGES)}
                title="Reset conversation"
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-white">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-1 border border-sky-200">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-sky-600 text-white rounded-tr-none shadow-sm'
                        : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className={`text-[10px] block mt-1.5 opacity-70 ${m.sender === 'user' ? 'text-sky-100 text-right' : 'text-slate-500'}`}>
                      {m.time}
                    </span>
                  </div>

                  {m.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-xs text-sky-700 font-medium">
                  <Bot className="w-4 h-4 animate-spin text-sky-600" />
                  <span>Xyra Assistant is generating response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Web, Apps, AI, Shoots, Marketing, SLAs..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 shadow-sm transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
