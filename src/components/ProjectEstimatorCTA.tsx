import React, { useState, useRef, useEffect } from "react";
import {
  Phone, Mail, MapPin, ArrowRight,
  CheckCircle2, Clock, ShieldCheck, Send,
  ChevronDown, Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────── */
const BUDGETS = [
  { label: "$1k – $5k",  value: "1k-5k"  },
  { label: "$5k – $15k", value: "5k-15k" },
  { label: "$15k – $50k",value: "15k-50k"},
  { label: "$50k+",      value: "50k+"   },
  { label: "Custom",     value: "custom" },
];

const SERVICE_OPTIONS = [
  "Website Development",
  "WordPress Development",
  "AI Website Creation",
  "Landing Pages",
  "Google Ads",
  "Meta Ads",
  "SEO / Local SEO",
  "E-Commerce",
  "AI Chatbot",
  "Website Management",
  "Other",
];

const TRUST_POINTS = [
  { icon: Clock,        color: "#10B981", title: "Response in under 24 hours", sub: "Guaranteed during business hours."   },
  { icon: ShieldCheck,  color: "#3B82F6", title: "NDA & confidentiality first", sub: "Your project details stay protected."},
  { icon: CheckCircle2, color: "#FF5A1F", title: "No obligation discovery call", sub: "Free strategy session. No hard sell."},
];

/* ─────────────────────────────────────────────────────
   SHARED INPUT CLASS
───────────────────────────────────────────────────── */
const inputCls =
  "w-full border border-ink-200 rounded-xl px-4 py-3 text-sm text-ink-900 " +
  "placeholder-ink-300 bg-white transition-all duration-200 outline-none " +
  "focus:border-brand-orange-400 focus:ring-2 focus:ring-brand-orange-100";

/* ─────────────────────────────────────────────────────
   CUSTOM SERVICE DROPDOWN
───────────────────────────────────────────────────── */
interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
}

function ServiceDropdown({ value, onChange }: DropdownProps) {
  const [open, setOpen]       = useState(false);
  const containerRef           = useRef<HTMLDivElement>(null);
  const displayLabel = value || "Select a service…";

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const select = (opt: string) => {
    onChange(opt);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          "w-full flex items-center justify-between gap-2",
          "border rounded-xl px-4 py-3 text-sm bg-white transition-all duration-200 outline-none text-left",
          open
            ? "border-brand-orange-400 ring-2 ring-brand-orange-100"
            : "border-ink-200 hover:border-ink-300",
          value ? "text-ink-900" : "text-ink-300",
        ].join(" ")}
      >
        <span className="truncate">{displayLabel}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-ink-400" />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={[
              "absolute left-0 right-0 z-50 mt-1.5",
              "bg-white border border-ink-200 rounded-xl overflow-hidden",
              "shadow-[0_8px_32px_rgba(10,13,20,0.12),0_2px_6px_rgba(10,13,20,0.06)]",
              "max-h-64 overflow-y-auto",
            ].join(" ")}
          >
            {SERVICE_OPTIONS.map((opt) => {
              const isSelected = value === opt;
              const isOther    = opt === "Other";
              return (
                <li
                  key={opt}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => select(opt)}
                  className={[
                    "flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer select-none",
                    "transition-colors duration-120",
                    isSelected
                      ? "bg-brand-orange-50 text-brand-orange-600 font-700"
                      : "text-ink-700 hover:bg-surface-1 font-500",
                    isOther ? "border-t border-ink-100 mt-0.5 pt-3 text-ink-500 italic" : "",
                  ].join(" ")}
                >
                  <span>{opt}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-brand-orange-500 shrink-0" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────── */
export default function ProjectEstimatorCTA() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    service: "", otherService: "",
    budget: "", customBudget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState<Record<string, string>>({});

  /* ── Derived state ─────────────────────────── */
  const showOtherField   = form.service === "Other";
  const showCustomBudget = form.budget  === "custom";

  /* ── Validation ────────────────────────────── */
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (showOtherField && !form.otherService.trim())
      e.otherService = "Please specify the service";
    if (showCustomBudget && !form.customBudget.trim())
      e.customBudget = "Please enter your budget";
    return e;
  };

  /* ── Helpers ───────────────────────────────── */
  const setField = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => { const n = { ...prev }; delete n[k]; return n; });
  };

  const setBudget = (val: string) => {
    setForm((f) => ({ ...f, budget: val, customBudget: val !== "custom" ? "" : f.customBudget }));
  };

  const setService = (val: string) => {
    setForm((f) => ({ ...f, service: val, otherService: val !== "Other" ? "" : f.otherService }));
    if (errors.service) setErrors((prev) => { const n = { ...prev }; delete n.service; return n; });
  };

  /* ── Submission ────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    /* Build the effective service and budget strings */
    const effectiveService = form.service === "Other"
      ? `Other: ${form.otherService}`
      : form.service;
    const effectiveBudget  = form.budget === "custom"
      ? `Custom: ${form.customBudget}`
      : form.budget;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          phone:   form.phone,
          service: effectiveService,
          budget:  effectiveBudget,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", service: "", otherService: "", budget: "", customBudget: "", message: "" });
      setErrors({});
    } catch {
      /* silent fail */
    } finally {
      setLoading(false);
    }
  };

  /* ── Shared error message ──────────────────── */
  const ErrorMsg = ({ field }: { field: string }) =>
    errors[field] ? (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[11px] text-red-500 font-600 mt-1"
      >
        {errors[field]}
      </motion.p>
    ) : null;

  /* ─────────────────────────────────────────── */

  return (
    <section id="contact" className="relative bg-white section-pad overflow-hidden">

      <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange-200 to-transparent" />

      <div className="container-xl relative z-10">

        {/* Header */}
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

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-start">

          {/* ── Left: contact info + trust ─────────── */}
          <div className="flex flex-col gap-6">

            <div className="card-lifted rounded-2xl p-7">
              <h3 className="text-lg font-800 text-ink-900 mb-5">Contact Us Directly</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Phone,  label: "Phone",    value: "+92 300 0955490",           href: "tel:+923000955490"                 },
                  { icon: Mail,   label: "Email",    value: "info@arrowheaddigitech.com", href: "mailto:info@arrowheaddigitech.com" },
                  { icon: MapPin, label: "Location", value: "Lahore, Pakistan",           href: "https://maps.google.com/?q=Lahore" },
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

            <div className="card-lifted rounded-2xl p-7">
              <h3 className="text-sm font-800 text-ink-500 uppercase tracking-widest mb-5">Why work with us</h3>
              <div className="flex flex-col gap-5">
                {TRUST_POINTS.map(({ icon: Icon, color, title, sub }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
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
          <div className="card-lifted rounded-2xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-brand-orange-500 via-brand-orange-400 to-brand-blue-500" />

            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait">

                {/* Success state */}
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </motion.div>
                    <h3 className="text-2xl font-extrabold text-ink-900 mb-2">Message Received!</h3>
                    <p className="text-ink-500 max-w-sm text-sm leading-relaxed mb-6">
                      Thank you — we'll review your enquiry and get back to you within 24 hours.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline text-sm">
                      Send Another Message
                    </button>
                  </motion.div>

                ) : (

                  /* Form */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    <div>
                      <h3 className="text-xl font-800 text-ink-900 mb-1">Start a Project</h3>
                      <p className="text-sm text-ink-400">Fill in the details and we'll be in touch shortly.</p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="John Smith"
                          value={form.name}
                          onChange={setField("name")}
                          className={`${inputCls} ${errors.name ? "border-red-400 ring-2 ring-red-100" : ""}`}
                        />
                        <ErrorMsg field="name" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={form.email}
                          onChange={setField("email")}
                          className={`${inputCls} ${errors.email ? "border-red-400 ring-2 ring-red-100" : ""}`}
                        />
                        <ErrorMsg field="email" />
                      </div>
                    </div>

                    {/* Phone + Service dropdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Phone (optional)</label>
                        <input
                          type="tel"
                          placeholder="+1 234 567 8900"
                          value={form.phone}
                          onChange={setField("phone")}
                          className={inputCls}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Service Needed</label>
                        <ServiceDropdown value={form.service} onChange={setService} />
                        <ErrorMsg field="service" />
                      </div>
                    </div>

                    {/* "Other" specify field — animated */}
                    <AnimatePresence>
                      {showOtherField && (
                        <motion.div
                          key="other-field"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                          exit={{   opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1.5 pt-1">
                            <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">
                              Please specify your service
                            </label>
                            <input
                              type="text"
                              autoFocus
                              placeholder="Describe the service you need…"
                              value={form.otherService}
                              onChange={setField("otherService")}
                              className={`${inputCls} ${errors.otherService ? "border-red-400 ring-2 ring-red-100" : ""}`}
                            />
                            <ErrorMsg field="otherService" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Budget */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Project Budget</label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGETS.map((b) => {
                          const isActive = form.budget === b.value;
                          return (
                            <button
                              key={b.value}
                              type="button"
                              onClick={() => setBudget(b.value)}
                              className={[
                                "px-4 py-2 rounded-lg text-xs font-700 border transition-all duration-200",
                                isActive
                                  ? "bg-brand-orange-500 text-white border-brand-orange-500 shadow-sm shadow-brand-orange-200"
                                  : "bg-white text-ink-600 border-ink-200 hover:border-brand-orange-300 hover:text-brand-orange-500",
                              ].join(" ")}
                            >
                              {b.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom budget input — animated */}
                      <AnimatePresence>
                        {showCustomBudget && (
                          <motion.div
                            key="custom-budget"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{   opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1.5 pt-2">
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-700 text-ink-400 pointer-events-none">
                                  $
                                </span>
                                <input
                                  type="text"
                                  autoFocus
                                  placeholder="e.g. 3,500"
                                  value={form.customBudget}
                                  onChange={setField("customBudget")}
                                  className={`${inputCls} pl-8 ${errors.customBudget ? "border-red-400 ring-2 ring-red-100" : ""}`}
                                />
                              </div>
                              <ErrorMsg field="customBudget" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-700 text-ink-600 uppercase tracking-wider">Tell Us About Your Project</label>
                      <textarea
                        rows={4}
                        placeholder="Briefly describe your goals, timeline, and any specific requirements…"
                        value={form.message}
                        onChange={setField("message")}
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.01 }}
                      whileTap={{  scale: loading ? 1 : 0.99 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="btn-primary btn-primary-shimmer w-full justify-center py-4 text-sm mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    </motion.button>

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
