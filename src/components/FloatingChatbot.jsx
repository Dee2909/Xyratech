import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, MessageSquare, Sparkles, 
  ChevronDown, ArrowUpRight, RotateCcw, CheckCircle2,
  Calendar, Layers, Sliders, ShieldCheck
} from 'lucide-react';
import LogoMark from './LogoMark';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "**Welcome to XYRA TECH.**\n\nI am your automated solutions architect. I can assist you with:\n• **Engineering**: Scalable web platforms & native iOS/Android apps\n• **AI Chatbots**: Custom RAG assistants & multi-turn agents\n• **Cloud & Media**: 99.99% Uptime site management & commercial 4K/8K shoots\n• **Growth**: Full-funnel digital marketing & data intelligence\n\nHow can we accelerate your roadmap today?",
    actions: [
      { label: 'Explore Services', target: 'services' },
      { label: 'Estimate Scope & Timeline', target: 'estimator' },
      { label: 'Book Discovery Call', target: 'contact' }
    ],
    time: 'Just now'
  }
];

const SUGGESTED_QUESTIONS = [
  'What services do you provide?',
  'How fast is deployment?',
  'What is your Uptime SLA?',
  'Schedule a consultation'
];

function formatInline(str, isUser) {
  const strongClass = isUser ? 'font-bold text-white' : 'font-bold text-slate-900';
  return str.replace(/\*\*(.*?)\*\*/g, `<strong class="${strongClass}">$1</strong>`);
}

function FormattedMessage({ text, isUser }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
          const content = trimmed.replace(/^[•\-]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 my-0.5">
              <span className={`font-bold shrink-0 mt-0.5 ${isUser ? 'text-white' : 'text-sky-600'}`}>•</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(content, isUser) }} />
            </div>
          );
        }

        return (
          <p key={idx} dangerouslySetInnerHTML={{ __html: formatInline(trimmed, isUser) }} />
        );
      })}
    </div>
  );
}

export default function FloatingChatbot({ onNavigateToSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTooltip(false);
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      let actions = [];
      const q = query.toLowerCase();

      if (q.includes('service') || q.includes('what') || q.includes('provide') || q.includes('do') || q.includes('offer')) {
        botResponse = "**XYRA TECH provides synchronized digital capabilities across 4 key domains:**\n\n• **Engineering**: Modern Web Platforms (React 19/Next.js) & Native Mobile Apps (iOS/Android)\n• **Artificial Intelligence**: Custom RAG assistants, LLM fine-tuning & autonomous workflow bots\n• **Reliability & Media**: 24/7 Site Management with 99.99% Uptime SLA & 4K/8K commercial shoots\n• **Growth Marketing**: Full-funnel digital campaigns & executive business data analysis\n\nWould you like to explore our full portfolio or configure your project scope?";
        actions = [
          { label: 'View Services Portfolio', target: 'services' },
          { label: 'Estimate Scope & Timeline', target: 'estimator' }
        ];
      } else if (q.includes('chatbot') || q.includes('ai') || q.includes('agent')) {
        botResponse = "**Enterprise AI Chatbot & Agent Engine:**\n\n• **RAG Ingestion**: Direct connection to your proprietary knowledge base, PDFs, and databases\n• **Sub-Second Latency**: Streaming token responses with strict hallucination guardrails\n• **Omnichannel Support**: Native web embed, mobile SDKs, WhatsApp, and Zendesk\n• **Security & Privacy**: SOC2 and GDPR compliant, isolated zero-data-retention deployments\n\nTypical production deployment takes 3 to 4 weeks.";
        actions = [
          { label: 'Configure Chatbot Scope', target: 'estimator' },
          { label: 'Book Discovery Call', target: 'contact' }
        ];
      } else if (q.includes('web') || q.includes('app') || q.includes('ios') || q.includes('android') || q.includes('mobile')) {
        botResponse = "**Application & Web Engineering:**\n\n• **Web**: React 19, Next.js, TypeScript, scalable serverless & microservices\n• **Mobile**: Native iOS (Swift), Android (Kotlin), and cross-platform Flutter\n• **Standards**: Offline-first encrypted caching, sub-second TTFB, and store certification";
        actions = [
          { label: 'Explore Engineering Stacks', target: 'tech-stack' },
          { label: 'Calculate Engineering Scope', target: 'estimator' }
        ];
      } else if (q.includes('sla') || q.includes('uptime') || q.includes('manage') || q.includes('hosting')) {
        botResponse = "**Site & Service Reliability Standards:**\n\n• **99.99% Guaranteed Uptime SLA**: Contractually backed with 24/7/365 active telemetry\n• **Disaster Recovery**: Automated geo-distributed daily backups and failover systems\n• **Rapid Incident Response**: < 15-minute emergency SLA with dedicated DevOps engineers";
        actions = [
          { label: 'Review Service Details', target: 'services' },
          { label: 'Speak with Solutions Lead', target: 'contact' }
        ];
      } else if (q.includes('shoot') || q.includes('marketing') || q.includes('ad') || q.includes('media')) {
        botResponse = "**Creative Production & Growth Engine:**\n\n• **Commercial Shoots**: 4K/8K cinema-grade product features, lifestyle video & aerial drone scans\n• **Performance Marketing**: Targeted acquisition across Meta, Google & TikTok ads\n• **Data Intelligence**: Real-time KPI dashboards tracking ROAS velocity (avg 3.8x - 4.6x)";
        actions = [
          { label: 'View Case Studies', target: 'impact' },
          { label: 'Plan Shoot & Campaign', target: 'contact' }
        ];
      } else if (q.includes('time') || q.includes('fast') || q.includes('deploy') || q.includes('cost') || q.includes('price') || q.includes('estimate')) {
        botResponse = "**Delivery Timelines & Roadmap Velocities:**\n\n• **Rapid MVP**: 2 to 4 weeks for core functionality and initial market rollout\n• **Production Platform**: 6 to 10 weeks including full cloud backend, APIs & testing\n• **Enterprise Ecosystem**: Multi-service architecture with 99.99% SLA integration\n\nYou can calculate an instant delivery estimate using our scope builder.";
        actions = [
          { label: 'Open Scope Estimator', target: 'estimator' },
          { label: 'Schedule Discovery Call', target: 'contact' }
        ];
      } else if (q.includes('call') || q.includes('schedule') || q.includes('consultation') || q.includes('contact') || q.includes('book') || q.includes('meeting')) {
        botResponse = "**Schedule Architectural Discovery:**\n\n• **15-Minute Response**: During standard operations\n• **NDA Included**: 100% confidential discussion\n• **Senior Review**: Speak directly with technical solution architects\n\nSubmit your preliminary scope below to reserve a session.";
        actions = [
          { label: 'Go to Discovery Hub', target: 'contact' }
        ];
      } else {
        botResponse = `**Thank you for your inquiry regarding "${query}".**\n\nXYRA TECH operates under our core philosophy: **Ideas • Technology • Growth**.\n\nWe provide end-to-end digital capabilities so you don't have to juggle separate agencies for software, AI, media, and marketing.\n\nHow can we help your team move forward?`;
        actions = [
          { label: 'Explore Services', target: 'services' },
          { label: 'Configure Scope', target: 'estimator' },
          { label: 'Book Discovery Call', target: 'contact' }
        ];
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botResponse,
          actions,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 550);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const handleActionClick = (target) => {
    if (target && onNavigateToSection) {
      onNavigateToSection(target);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Greeting Tooltip (Turing.com Style) */}
      {!isOpen && showTooltip && (
        <div className="mb-3 hidden sm:flex items-center gap-3 bg-white border border-sky-200/90 rounded-2xl py-3 px-4 shadow-[0_15px_35px_rgba(15,23,42,0.12)] max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 font-bold text-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-slate-900 leading-tight">Need technical consultation?</p>
            <p className="text-slate-500 text-[11px] mt-0.5">Chat with Xyra AI Assistant</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[420px] h-[580px] max-h-[84vh] bg-white border border-sky-200 rounded-[2rem] shadow-[0_24px_80px_rgba(15,23,42,0.22)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-sky-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center p-1.5 backdrop-blur-md shadow-inner">
                  <LogoMark className="w-full h-full" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-sky-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-2">
                  <span>Xyra Assistant</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                    AI AGENT
                  </span>
                </h4>
                <p className="text-[11px] text-sky-100 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online • Immediate response</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={handleReset}
                title="Reset Conversation"
                className="p-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Info Ribbon */}
          <div className="bg-sky-50 px-4 py-2 border-b border-sky-100 flex items-center justify-between text-[11px] font-mono text-sky-800">
            <span>XYRA TECH CONVERSATIONAL ENGINE</span>
            <span className="font-semibold text-emerald-700">RAG ACTIVE</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none shadow-sm'
                  }`}
                >
                  <FormattedMessage text={msg.text} isUser={msg.sender === 'user'} />

                  {/* Action buttons inside bot messages (Turing.com Style) */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(act.target)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200 hover:border-sky-600 font-semibold text-[11px] transition-all shadow-sm group"
                        >
                          <span>{act.label}</span>
                          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span
                    className={`text-[9px] block mt-1.5 font-mono ${
                      msg.sender === 'user' ? 'text-sky-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 text-xs text-slate-500 rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] font-mono">Generating response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="px-4 py-2 bg-white border-t border-slate-100">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Suggested Topics:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Web, Apps, AI, Shoots, Marketing..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white transition-all shadow-md shadow-sky-500/20"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Circular Trigger Button (Turing.com Style) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Chatbot"
        className={`group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-tr from-sky-600 to-sky-500 text-white shadow-[0_15px_35px_rgba(2,132,199,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'rotate-90' : 'hover:shadow-[0_20px_45px_rgba(2,132,199,0.45)]'
        }`}
      >
        {isOpen ? (
          <X className="h-7 w-7 text-white" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
