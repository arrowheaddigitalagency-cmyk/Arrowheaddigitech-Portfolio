import React, { useState } from "react";
import {
  Phone, Mail, MapPin, ArrowRight,
  CheckCircle2, Clock, ShieldCheck, Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const BUDGETS = [
  { label: "$1k – $5k",      value: "1k-5k"   },
  { label: "$5k – $15k",     value: "5k-15k"  },
  { label: "$15k – $50k",    value: "15k-50k" },
  { label: "$50k+",          value: "50k+"    },
];

const SERVICES = [
  "Website Development", "WordPress Development", "AI Website Creation",
  "Landing Pages", "Google Ads", "Meta Ads",
  "SEO / Local SEO", "E-Commerce", "AI Chatbot", "Website Management",
];

const TRUST_POINTS = [
  { icon: Clock,        color: "#10B981", title: "Response in under 24 hours",  sub: "Guaranteed during business hours." },
  { icon: ShieldCheck,  color: "#3B82F6", title: "NDA & confidentiality first",  sub: "Your project details stay protected."  },
  { icon: CheckCircle2, color: "#FF5A1F", title: "No obligation discovery call",  sub: "Free strategy session. No hard sell."  },
];

export default function ProjectEstimatorCTA() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    service: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "3f947f04-efd8-40d7-bf64-829010e2ae72",
          subject: `New enquiry from ${form.name} — Arrowhead DigiTech`,
          ...form,
        }),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
    } catch {
      /* silent fail */
    } finally {
      setLoading(false);
    }
  };

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="relative bg-white section-pad overflow-hidden">

      <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange-200 to-transparent" />

      <div className="container-xl relative z-10">

        {/* ── Header ────────────────────────────────── */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="section-label mb-3">Get in Touch</p>
          <div className="hr-accent mx-auto mb-5" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight mb-4">
            Let's Grow Your{" "}
            <span className="text-gradient-orange">Business Together.</span>
          </h2>
          <p className="text-base text-ink-500 leading-relaxed">
            Tell us about your project. We'll review it and come back to you within 24 hours with honest advice — not a sales pitch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-stretch">

          {/* ── Left: info + trust ─────────────────── */}
          <div className="flex flex-col gap-6 h-full">

            {/* Contact details */}
            <div className="card-lifted rounded-2xl p-7">
              <h3 className="text-lg font-800 text-ink-900 mb-5">Contact Us Directly</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Phone,  label: "Phone",    value: "+92 300 0955490",            href: "tel:+923000955490"                    },
                  { icon: Mail,   label: "Email",    value: "info@arrowheaddigitech.com",  href: "mailto:info@arrowheaddigitech.com"    },
                  { icon: MapPin, label: "Location", value: "Lahore, Pakistan",            href: "https://maps.google.com/?q=Lahore"    },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-1 border border-ink-100 hover:border-brand-orange-200 hover:bg-brand-orange-50/30 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-orange-500 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">{label}</p>
                      <p className="text-sm font-700 text-ink-900 group-hover:text-brand-orange-500 transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Trust points */}
            <div className="card-lifted rounded-2xl p-7">
              <h3 className="text-sm font-800 text-ink-500 uppercase tracking-widest mb-5">Why work with us</h3>
              <div className="flex flex-col gap-5">
                {TRUST_POINTS.map(({ icon: Icon, color, title, sub }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-sm font-700 text-ink-900">{title}</p>
                      <p className="text-xs text-ink-400 font-500 mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right: form ────────────────────────── */}
          <div className="card-lifted rounded-2xl overflow-hidden flex flex-col">
            {/* Orange top bar */}
            <div className="h-1.5 bg-gradient-to-r from-brand-orange-500 via-brand-orange-400 to-brand-blue-500" />

            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-ink-900 mb-2">Message Received!</h3>
                    <p className="text-ink-500 max-w-sm text-sm leading-relaxed mb-6">
                      Thank you — we'll review your enquiry and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline text-sm"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <h3 className="text-xl font-800 text-ink-900 mb-1">Start a Project</h3>
                    <p className="text-sm text-ink-400 -mt-1 mb-2">Fill in the details and we'll be in touch shortly.</p>

                    {/* Name + email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="John Smith"
                          value={form.name}
                          onChange={set("name")}
                          className="w-full border border-ink-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-ink-300 focus:outline-none focus:border-brand-orange-400 focus:ring-2 focus:ring-brand-orange-100 transition-all bg-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={form.email}
                          onChange={set("email")}
                          className="w-full border border-ink-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-ink-300 focus:outline-none focus:border-brand-blue-400 focus:ring-2 focus:ring-brand-blue-100 transition-all bg-white"
                        />
                      </div>
                    </div>

                    {/* Phone + service row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Phone (optional)</label>
                        <input
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={form.phone}
                          onChange={set("phone")}
                          className="w-full border border-ink-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-ink-300 focus:outline-none focus:border-brand-orange-400 focus:ring-2 focus:ring-brand-orange-100 transition-all bg-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Service Needed</label>
                        <select
                          value={form.service}
                          onChange={set("service")}
                          className="w-full border border-ink-200 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-brand-orange-400 focus:ring-2 focus:ring-brand-orange-100 transition-all bg-white appearance-none"
                        >
                          <option value="">Select a service…</option>
                          {SERVICES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Project Budget</label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGETS.map((b) => (
                          <button
                            key={b.value}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, budget: b.value }))}
                            className={`px-4 py-2 rounded-lg text-xs font-700 border transition-all ${
                              form.budget === b.value
                                ? "bg-brand-orange-500 text-white border-brand-orange-500"
                                : "bg-white text-ink-600 border-ink-200 hover:border-brand-orange-300"
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Tell Us About Your Project</label>
                      <textarea
                        rows={4}
                        placeholder="Briefly describe your goals, timeline, and any specific requirements…"
                        value={form.message}
                        onChange={set("message")}
                        className="w-full border border-ink-200 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-ink-300 focus:outline-none focus:border-brand-orange-400 focus:ring-2 focus:ring-brand-orange-100 transition-all resize-none bg-white"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-4 text-sm mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-ink-300 text-center">
                      By submitting you agree to our privacy policy. We never share your information.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
