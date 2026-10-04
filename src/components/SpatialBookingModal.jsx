import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES } from '../data/servicesData';
import { sound } from '../utils/audio';

export default function SpatialBookingModal({ preselectedServiceId, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$10k - $25k',
    timeline: 'Within 1-2 Months',
    services: preselectedServiceId ? [preselectedServiceId] : ['web-dev', 'ai-chatbot'],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (id) => {
    sound.playClick();
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(id)
        ? (prev.services.length > 1 ? prev.services.filter(s => s !== id) : prev.services)
        : [...prev.services, id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    sound.playClick();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playBeacon();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Project Scope Transmitted!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <span className="text-cyan-400 font-bold">{form.name}</span>. An architectural lead at XYRA TECH has received your blueprint inquiry. We respond within 15 minutes.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-700/60 hover:bg-cyan-900/60 transition-all"
              >
                Return to 3D Space
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>MISSION LAUNCH TERMINAL</span>
              </div>
              <h3 className="text-2xl font-black text-white">Schedule Technical Discovery Call</h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct senior architect session • NDA protection guaranteed
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Taylor Reid"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Work Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="taylor@company.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Orbit Technologies"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Budget Target</label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Under $10k">&lt; $10k (Audit / MVP)</option>
                  <option value="$10k - $25k">$10k - $25k (Growth Tier)</option>
                  <option value="$25k - $60k">$25k - $60k (Comprehensive)</option>
                  <option value="$60k+">$60k+ (Enterprise Multi-Service)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Services Required ({form.services.length}):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SERVICES.map((s) => {
                  const isChecked = form.services.includes(s.id);
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all ${
                        isChecked
                          ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate block">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Project Scope Summary</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Briefly describe your objectives, milestones, or current bottlenecks..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:brightness-110 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting...' : 'Submit & Book Discovery Call'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
