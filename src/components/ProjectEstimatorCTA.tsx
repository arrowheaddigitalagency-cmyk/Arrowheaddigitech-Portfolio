import React, { useState } from "react";
import { Check, Mail, Phone, MapPin, Globe, Sparkles, Send, CheckCircle2, Calculator, CalendarDays, Linkedin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ProjectEstimatorCTA() {
  const [activeStep, setActiveStep] = useState<"configure" | "submitted">("configure");
  
  // States
  const [selectedService, setSelectedService] = useState<string>("meta-ads");
  const [targetLeads, setTargetLeads] = useState<number>(300);
  const [corpName, setCorpName] = useState("");
  const [corpEmail, setCorpEmail] = useState("");
  const [corpCompany, setCorpCompany] = useState("");
  const [successQuoteId, setSuccessQuoteId] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const servicesMap = [
    { id: "google-ads", label: "Google Ads", multiplier: 21 },
    { id: "meta-ads", label: "Meta Ads", multiplier: 16 },
    { id: "web-dev", label: "Web Development", multiplier: 12 },
    { id: "ai-chatbots", label: "AI Chatbots", multiplier: 8 },
    { id: "lead-generation", label: "Lead Generation", multiplier: 18 }
  ];

  const getSimulatedBudget = () => {
    const currentObj = servicesMap.find((s) => s.id === selectedService) || servicesMap[0];
    return targetLeads * currentObj.multiplier;
  };

  const getSimulatedRevenue = () => {
    const budget = getSimulatedBudget();
    return Math.floor(budget * 4.2).toLocaleString();
  };

  const handleSubmitEstimator = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (!corpName.trim() || !corpEmail.trim()) {
      setValidationError("Corporate identity fields (Name & Email) are required to calculate parameter weights.");
      return;
    }

    const randomSerial = `QD-${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessQuoteId(randomSerial);
    setActiveStep("submitted");
  };

  return (
    <section id="estimate" className="py-32 relative overflow-hidden bg-transparent select-none text-left">
      
      {/* Structural vertical guides */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />

      {/* Lighting */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-brand-blue-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-brand-orange-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative w-full z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct Agency Contacts */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center h-full space-y-12">
            <div className="space-y-6 relative">
              
              {/* Floating 3D Calendar Placeholder */}
              <motion.div 
                animate={{ y: [0, -15, 0], rotateZ: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -left-10 opacity-20 pointer-events-none"
              >
                <CalendarDays className="w-40 h-40 text-brand-orange-500" />
              </motion.div>

              <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 font-bold block uppercase">
                // ONSITE CALL CENTERS
              </span>

              <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                SCALE YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                  OUTREACH.
                </span>
              </h2>

              <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-sm">
                Ready to deploy customized ad spending frameworks, compile performance React directories, and dominate local search rankings? Reach out to us.
              </p>

              {/* Verified Contacts blocks */}
              <div className="space-y-4 pt-6">
                
                {/* Email address */}
                <a href="mailto:info@arrowheaddigitech.com" className="flex items-center gap-5 glass-card p-4 rounded-2xl max-w-md group hover:scale-[1.02] transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-orange-500 shadow-md group-hover:bg-brand-orange-500 group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-widest mb-1">
                      Operational Enquiries
                    </span>
                    <span className="text-sm font-bold text-slate-800 transition-colors">
                      info@arrowheaddigitech.com
                    </span>
                  </div>
                </a>

                {/* Phone number */}
                <a href="tel:+923000955490" className="flex items-center gap-5 glass-card p-4 rounded-2xl max-w-md group hover:scale-[1.02] transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-md group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-widest mb-1">
                      Voice Helpline
                    </span>
                    <span className="text-sm font-bold text-slate-800 transition-colors">
                      +92 300 0955490
                    </span>
                  </div>
                </a>

                {/* Website */}
                <a href="https://arrowheaddigitech.com" target="_blank" rel="noreferrer" className="flex items-center gap-5 glass-card p-4 rounded-2xl max-w-md group hover:scale-[1.02] transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-blue-500 shadow-md group-hover:bg-brand-blue-500 group-hover:text-white transition-colors shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-widest mb-1">
                      Global Hub
                    </span>
                    <span className="text-sm font-bold text-slate-800 transition-colors">
                      arrowheaddigitech.com
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a href="https://linkedin.com/company/arrowheaddigitech" target="_blank" rel="noreferrer" className="flex items-center gap-5 glass-card p-4 rounded-2xl max-w-md group hover:scale-[1.02] transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0A66C2] shadow-md group-hover:bg-[#0A66C2] group-hover:text-white transition-colors shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-widest mb-1">
                      Corporate Network
                    </span>
                    <span className="text-sm font-bold text-slate-800 transition-colors">
                      Arrowhead DigiTech
                    </span>
                  </div>
                </a>

                {/* Geographic office location */}
                <div className="flex items-center gap-5 glass-card p-4 rounded-2xl max-w-md">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-blue-500 shadow-md shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-widest mb-1">
                      Physical Boardroom
                    </span>
                    <span className="text-sm font-bold text-slate-800 block">
                      Lahore, Pakistan
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Custom Interactive Performance Calculator */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-[2rem] p-8 sm:p-10 border-2 border-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {activeStep === "configure" ? (
                  <motion.form 
                    key="configure"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmitEstimator} 
                    className="space-y-8 relative z-10"
                  >
                    
                    <div className="flex items-center justify-between pb-6 border-b border-slate-200/50">
                      <div>
                        <h3 className="text-slate-900 text-sm font-bold font-mono uppercase tracking-widest flex items-center gap-3">
                          <Calculator className="w-5 h-5 text-brand-orange-500" />
                          BUDGET CONFIGURATION WIDGET
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 font-medium">
                          Select your metrics to calculate simulated yield factors.
                        </p>
                      </div>
                    </div>

                    {validationError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 p-4 text-xs rounded-xl font-mono leading-relaxed text-left flex items-start gap-3">
                        <span className="text-xl">⚠</span> {validationError}
                      </div>
                    )}

                    {/* 1. Select Service focus */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                        1. Select Service Category
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {servicesMap.map((serv) => {
                          const isSel = serv.id === selectedService;
                          return (
                            <div
                              key={serv.id}
                              onClick={() => setSelectedService(serv.id)}
                              className={`p-4 text-center rounded-xl cursor-pointer transition-all duration-300 select-none border-2 ${
                                isSel
                                  ? "bg-brand-orange-500 border-brand-orange-500 text-white shadow-lg shadow-brand-orange-500/20 scale-105"
                                  : "bg-white/60 border-white text-slate-600 hover:border-brand-orange-200 hover:bg-white"
                              }`}
                            >
                              <span className="text-xs font-mono font-bold tracking-wider uppercase block truncate">
                                {serv.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Drag targets */}
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                        <span>2. Monthly Leads Objective</span>
                        <span className="text-brand-orange-600 font-bold bg-brand-orange-50 px-3 py-1 rounded-full">{targetLeads} LEADS</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="1500"
                        step="50"
                        value={targetLeads}
                        onChange={(e) => setTargetLeads(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-brand-orange-500 focus:outline-none"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold">
                        <span>50</span>
                        <span>1,500+</span>
                      </div>
                    </div>

                    {/* 3. Output box */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 grid grid-cols-2 gap-6 shadow-sm">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold tracking-widest mb-2">Simulated Ad Spend</span>
                        <span className="text-3xl font-black font-mono text-slate-900 block tracking-tighter">
                          ${getSimulatedBudget().toLocaleString()}
                        </span>
                      </div>
                      <div className="pl-6 border-l border-slate-100">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold tracking-widest mb-2">Expected Revenue Lift</span>
                        <span className="text-3xl font-black font-mono text-emerald-500 block tracking-tighter">
                          ${getSimulatedRevenue()}
                        </span>
                      </div>
                    </div>

                    {/* 4. Identity input fields */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                        3. Input Business Channels
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          value={corpName}
                          onChange={(e) => {
                            setValidationError(null);
                            setCorpName(e.target.value);
                          }}
                          placeholder="Your Name"
                          className="bg-white/80 backdrop-blur-sm border-2 border-white focus:bg-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-brand-orange-500 placeholder-slate-400 font-medium shadow-sm transition-all"
                        />
                        <input
                          type="email"
                          required
                          value={corpEmail}
                          onChange={(e) => {
                            setValidationError(null);
                            setCorpEmail(e.target.value);
                          }}
                          placeholder="Business Email"
                          className="bg-white/80 backdrop-blur-sm border-2 border-white focus:bg-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-brand-orange-500 placeholder-slate-400 font-medium shadow-sm transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        value={corpCompany}
                        onChange={(e) => setCorpCompany(e.target.value)}
                        placeholder="Company Name (Optional)"
                        className="w-full bg-white/80 backdrop-blur-sm border-2 border-white focus:bg-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:border-brand-orange-500 placeholder-slate-400 font-medium shadow-sm transition-all"
                      />
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
                      <button
                        type="submit"
                        className="w-full sm:w-auto flex-1 py-4 px-8 bg-slate-900 hover:bg-black text-white font-bold text-xs tracking-widest uppercase shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-3 cursor-pointer rounded-xl"
                      >
                        GENERATE SYSTEM GRAPH
                        <Send className="w-4 h-4 text-brand-orange-500" />
                      </button>
                      
                      <button type="button" className="w-full sm:w-auto flex-1 py-4 px-8 bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-bold text-xs tracking-widest uppercase shadow-xl shadow-brand-orange-500/20 transition-all flex items-center justify-center gap-3 cursor-pointer rounded-xl">
                        <CalendarDays className="w-4 h-4" /> Book Discovery Call
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 text-center font-mono uppercase tracking-widest font-bold">
                      *Expect review documentation compiled within 12 hours.
                    </p>

                  </motion.form>
                ) : (
                  <motion.div 
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8 text-slate-800 py-8 text-left relative z-10"
                  >
                    
                    <div className="flex flex-col items-center justify-center text-center space-y-4 pb-8 border-b border-slate-200/50">
                      <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/30">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl font-extrabold tracking-tight">BLUEPRINT COMPILED!</h3>
                      <p className="text-base text-slate-600 max-w-sm font-medium">
                        Greetings {corpName}. Your simulated acquisition objective has been successfully registered.
                      </p>
                    </div>

                    {/* Summary receipt box */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-8 space-y-4 font-mono text-sm text-slate-600 shadow-sm">
                      
                      <div className="flex justify-between border-b border-slate-100 pb-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        <span>ARROWHEAD SYSTEM CONFIRMATION</span>
                        <span className="text-brand-orange-500">{successQuoteId}</span>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between">
                          <span>Partner Lead:</span>
                          <span className="text-slate-900 font-bold">{corpName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email Identity:</span>
                          <span className="text-slate-900 font-bold">{corpEmail}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Target Category:</span>
                          <span className="text-brand-orange-500 font-bold">{servicesMap.find(s=>s.id===selectedService)?.label}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Velocity Metric:</span>
                          <span className="text-slate-900">{targetLeads} leads/mo</span>
                        </div>
                      </div>

                      <div className="pt-4 mt-2 border-t border-slate-100 space-y-3">
                        <div className="flex justify-between">
                          <span>Estimated Bid Capital:</span>
                          <span className="text-slate-900 font-bold">${getSimulatedBudget().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-emerald-500 font-bold text-lg">
                          <span>Projected Value Impact:</span>
                          <span>${getSimulatedRevenue()}</span>
                        </div>
                      </div>

                    </div>

                    <button
                      onClick={() => setActiveStep("configure")}
                      className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs tracking-widest uppercase border border-slate-200 rounded-xl transition-all font-mono cursor-pointer flex justify-center items-center gap-2"
                    >
                      ← RECONFIGURE BLUEPRINT
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
