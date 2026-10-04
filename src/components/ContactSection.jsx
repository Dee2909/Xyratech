import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Shield, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES } from '../data/servicesData';

import SectionHeading from './SectionHeading';

export default function ContactSection({ selectedServicesForBooking }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$10k - $25k',
    services: [],
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedServicesForBooking && selectedServicesForBooking.length > 0) {
      setForm(prev => ({
        ...prev,
        services: selectedServicesForBooking
      }));
    }
  }, [selectedServicesForBooking]);

  const handleToggleService = (id) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter(s => s !== id)
        : [...prev.services, id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading
          eyebrow="Project Discovery Hub"
          title="Initiate Your Project"
          description="Schedule a technical architecture discovery call with our solutions directors. We respond within 15 minutes during standard operations."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        {/* Left Information Cards */}
        <div className="lg:col-span-5 space-y-6 w-full">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sky-100 shadow-[0_10px_35px_-5px_rgba(14,165,233,0.08)] space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Why Partner With XYRA TECH?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-200">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">One Unified Tech Partner</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    No disjointed vendor handoffs. Web, apps, AI chatbots, ad shoots, and marketing work in complete synchronization.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-200">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Enterprise Confidentiality & NDA</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Mutual non-disclosure agreements executed before technical discovery. Complete IP transfer upon release.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-200">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Guaranteed 99.99% Uptime SLA</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Continuous site telemetry, auto-scaling cloud clusters, and 15-minute emergency DevOps response.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-600" />
                <span>contact@xyratech.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-600" />
                <span>+1 (800) XYRA-TECH</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Global Digital Operations • Distributed Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Consultation Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-sky-100 shadow-[0_15px_35px_-5px_rgba(14,165,233,0.12)] w-full">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-sky-100 border border-sky-400 text-sky-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Inquiry Received Successfully!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="text-sky-600 font-semibold">{form.name}</span>. A senior solutions architect from XYRA TECH has been assigned to your scope.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl text-xs font-mono text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-all font-semibold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 uppercase tracking-wider mb-2 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Alex Vance"
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 uppercase tracking-wider mb-2 font-medium">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@enterprise.com"
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 uppercase tracking-wider mb-2 font-medium">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Innovations"
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 uppercase tracking-wider mb-2 font-medium">
                    Target Budget Range
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors"
                  >
                    <option value="Under $10k">&lt; $10k (Audit / MVP)</option>
                    <option value="$10k - $25k">$10k - $25k (Growth Build)</option>
                    <option value="$25k - $60k">$25k - $60k (Comprehensive)</option>
                    <option value="$60k+">$60k+ (Enterprise Multi-Service)</option>
                  </select>
                </div>
              </div>

              {/* Service Selection Checklist */}
              <div>
                <label className="block text-xs font-mono text-slate-700 uppercase tracking-wider mb-2 font-medium">
                  Select Applicable Services:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SERVICES.map((s) => {
                    const isChecked = form.services.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => handleToggleService(s.id)}
                        className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                          isChecked
                            ? 'bg-sky-50 border-sky-400 text-sky-800 font-semibold shadow-sm'
                            : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-sky-300'
                        }`}
                      >
                        <div className="truncate">{s.title}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 uppercase tracking-wider mb-2 font-medium">
                  Project Vision & Technical Requirements
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your objectives, current architecture, or growth milestones..."
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting Scope Blueprint...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Project Scope & Schedule Discovery</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
