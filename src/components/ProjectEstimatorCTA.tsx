import React, { useState } from "react";
import { Send, Sparkles, Building2, User, Mail, Phone, ChevronDown, MessagesSquare, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ProjectEstimatorCTA() {
  const [activeStep, setActiveStep] = useState<"form" | "success">("form");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: ""
  });

  const handleFocus = (name: string) => setFocusedInput(name);
  const handleBlur = () => setFocusedInput(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep("success");
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-transparent select-none text-left">
      
      {/* 3D Floating Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-20 w-[600px] h-[600px] bg-brand-orange-500/10 blur-[150px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 40, 0], scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 left-20 w-[500px] h-[500px] bg-brand-blue-500/10 blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Column: Copy & Details */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">ACCEPTING NEW CLIENTS</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              INITIATE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                GROWTH SEQUENCES.
              </span>
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-md">
              Secure your digital infrastructure. Deploy high-conversion assets and outmaneuver your competition. Let’s build something extraordinary.
            </p>
          </div>

          <div className="space-y-6 pt-8 border-t border-slate-200/50 max-w-md">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-orange-500 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest mb-1">Direct Operations</span>
                <a href="mailto:info@arrowheaddigitech.com" className="text-base font-bold text-slate-900 hover:text-brand-orange-500 transition-colors">
                  info@arrowheaddigitech.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-blue-500 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest mb-1">Priority Line</span>
                <a href="tel:+923000955490" className="text-base font-bold text-slate-900 hover:text-brand-blue-500 transition-colors">
                  +92 300 0955490
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Form */}
        <div className="relative w-full">
          {/* Subtle glow behind the form */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-orange-500/5 to-transparent rounded-[2.5rem] blur-xl transform translate-y-10" />
          
          <div className="glass-panel p-10 sm:p-12 relative overflow-hidden">
            
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-orange-500 via-brand-blue-500 to-brand-orange-500" />
            
            <AnimatePresence mode="wait">
              {activeStep === "form" ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="w-5 h-5 text-brand-orange-500" />
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Project Parameters</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="relative group">
                      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${focusedInput === "name" ? "bg-brand-orange-500/10 blur-md" : "bg-transparent"}`} />
                      <div className={`relative flex items-center bg-white rounded-xl border transition-all duration-300 ${focusedInput === "name" ? "border-brand-orange-500 shadow-lg shadow-brand-orange-500/10" : "border-slate-200 hover:border-slate-300"}`}>
                        <User className={`w-5 h-5 ml-4 ${focusedInput === "name" ? "text-brand-orange-500" : "text-slate-400"}`} />
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} onFocus={() => handleFocus("name")} onBlur={handleBlur} placeholder="Full Name" className="w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative group">
                      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${focusedInput === "email" ? "bg-brand-orange-500/10 blur-md" : "bg-transparent"}`} />
                      <div className={`relative flex items-center bg-white rounded-xl border transition-all duration-300 ${focusedInput === "email" ? "border-brand-orange-500 shadow-lg shadow-brand-orange-500/10" : "border-slate-200 hover:border-slate-300"}`}>
                        <Mail className={`w-5 h-5 ml-4 ${focusedInput === "email" ? "text-brand-orange-500" : "text-slate-400"}`} />
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} onFocus={() => handleFocus("email")} onBlur={handleBlur} placeholder="Work Email" className="w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none" />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative group">
                      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${focusedInput === "phone" ? "bg-brand-orange-500/10 blur-md" : "bg-transparent"}`} />
                      <div className={`relative flex items-center bg-white rounded-xl border transition-all duration-300 ${focusedInput === "phone" ? "border-brand-orange-500 shadow-lg shadow-brand-orange-500/10" : "border-slate-200 hover:border-slate-300"}`}>
                        <Phone className={`w-5 h-5 ml-4 ${focusedInput === "phone" ? "text-brand-orange-500" : "text-slate-400"}`} />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} onFocus={() => handleFocus("phone")} onBlur={handleBlur} placeholder="Phone Number" className="w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none" />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="relative group">
                      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${focusedInput === "company" ? "bg-brand-orange-500/10 blur-md" : "bg-transparent"}`} />
                      <div className={`relative flex items-center bg-white rounded-xl border transition-all duration-300 ${focusedInput === "company" ? "border-brand-orange-500 shadow-lg shadow-brand-orange-500/10" : "border-slate-200 hover:border-slate-300"}`}>
                        <Building2 className={`w-5 h-5 ml-4 ${focusedInput === "company" ? "text-brand-orange-500" : "text-slate-400"}`} />
                        <input type="text" name="company" value={formData.company} onChange={handleChange} onFocus={() => handleFocus("company")} onBlur={handleBlur} placeholder="Company Name" className="w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${focusedInput === "service" ? "bg-brand-orange-500/10 blur-md" : "bg-transparent"}`} />
                      <div className={`relative bg-white rounded-xl border transition-all duration-300 ${focusedInput === "service" ? "border-brand-orange-500 shadow-lg shadow-brand-orange-500/10" : "border-slate-200 hover:border-slate-300"}`}>
                        <select name="service" required value={formData.service} onChange={handleChange} onFocus={() => handleFocus("service")} onBlur={handleBlur} className="w-full bg-transparent px-5 py-4 text-sm font-medium text-slate-900 appearance-none outline-none cursor-pointer invalid:text-slate-400">
                          <option value="" disabled hidden>Select Service</option>
                          <option value="web">Web Application</option>
                          <option value="ads">Performance Media</option>
                          <option value="ai">AI Integrations</option>
                          <option value="seo">Search Optimization</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="relative group">
                      <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${focusedInput === "budget" ? "bg-brand-orange-500/10 blur-md" : "bg-transparent"}`} />
                      <div className={`relative bg-white rounded-xl border transition-all duration-300 ${focusedInput === "budget" ? "border-brand-orange-500 shadow-lg shadow-brand-orange-500/10" : "border-slate-200 hover:border-slate-300"}`}>
                        <select name="budget" required value={formData.budget} onChange={handleChange} onFocus={() => handleFocus("budget")} onBlur={handleBlur} className="w-full bg-transparent px-5 py-4 text-sm font-medium text-slate-900 appearance-none outline-none cursor-pointer invalid:text-slate-400">
                          <option value="" disabled hidden>Monthly Budget</option>
                          <option value="5k">&lt; $5,000</option>
                          <option value="10k">$5,000 - $10,000</option>
                          <option value="25k">$10,000 - $25,000</option>
                          <option value="50k">$25,000+</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative group">
                    <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${focusedInput === "message" ? "bg-brand-orange-500/10 blur-md" : "bg-transparent"}`} />
                    <div className={`relative flex items-start bg-white rounded-xl border transition-all duration-300 ${focusedInput === "message" ? "border-brand-orange-500 shadow-lg shadow-brand-orange-500/10" : "border-slate-200 hover:border-slate-300"}`}>
                      <MessagesSquare className={`w-5 h-5 ml-4 mt-4 shrink-0 ${focusedInput === "message" ? "text-brand-orange-500" : "text-slate-400"}`} />
                      <textarea name="message" required value={formData.message} onChange={handleChange} onFocus={() => handleFocus("message")} onBlur={handleBlur} placeholder="Project Details..." rows={3} className="w-full bg-transparent px-4 py-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none resize-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-sm tracking-widest uppercase shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-orange-500/20 to-brand-blue-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    Initialize Protocol
                    <Send className="w-4 h-4 text-brand-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>

                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-6"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/20 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping" />
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">TRANSMISSION RECEIVED</h3>
                  <p className="text-slate-600 font-medium max-w-sm mx-auto">
                    Your parameters have been logged. An executive architect will contact you within 2 hours.
                  </p>
                  <button 
                    onClick={() => setActiveStep("form")}
                    className="mt-8 px-8 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Reset Form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
