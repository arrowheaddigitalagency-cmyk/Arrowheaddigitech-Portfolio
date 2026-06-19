import React, { useState } from "react";
import {
  Search,
  Share2,
  Video,
  Code,
  Smartphone,
  Bot,
  MapPin,
  Target,
  Sparkles,
  Workflow,
  Send,
  Terminal,
  CheckCircle,
  Clock,
  Play,
  BarChart3,
  Network,
  BrainCircuit,
  MonitorSmartphone,
  Globe2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Service {
  id: string;
  title: string;
  category: string;
  bullet: string;
  metric: string;
  gain: string;
  details: string;
  features: string[];
  accentColor: string;
  icon3D: React.ReactNode;
}

export default function InteractiveServices() {
  const [selectedService, setSelectedService] = useState<string>("google-ads");
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "Enterprise Agent active. How can I assist your pipeline today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [compileOutput, setCompileOutput] = useState("Idle. Deploying container pipeline standard check...");
  const [isCompiling, setIsCompiling] = useState(false);
  const [adsOptimized, setAdsOptimized] = useState(true);

  const services: Service[] = [
    {
      id: "google-ads",
      title: "Google Ads (High-Intent PPC)",
      category: "Google Ads",
      bullet: "Intent-Action Funneling",
      metric: "Avg. ROI",
      gain: "4.8x Scaled",
      details: "Intercept high-intent search queries and direct them to ultra-optimized landers. Programmatic fractional bidding prevents budget waste.",
      features: ["Keywords schema mapping", "programmatic bids balancing", "Negative keyword daily grooming", "Conversion tag audit"],
      accentColor: "#3B82F6", // brand-blue-500
      icon3D: <BarChart3 className="w-20 h-20 text-blue-500 drop-shadow-[0_10px_10px_rgba(59,130,246,0.5)]" />
    },
    {
      id: "meta-ads",
      title: "Meta Ads (Direct-to-Consumer)",
      category: "Meta Ads",
      bullet: "Interactive Storytelling",
      metric: "ROAS Ratio",
      gain: "5.4x Attained",
      details: "Stop scrolls instantly. We couple high-velocity copywriting with stunning custom lifestyle imagery to target high-intent purchasers.",
      features: ["Dynamic budget scaling (CBO)", "Multivariate aesthetic split testing", "Lookalike database uploads", "Frictionless catalog ads"],
      accentColor: "#8B5CF6", // purple
      icon3D: <Network className="w-20 h-20 text-purple-500 drop-shadow-[0_10px_10px_rgba(139,92,246,0.5)]" />
    },
    {
      id: "ai-chatbots",
      title: "Autonomous AI Chatbots",
      category: "OpenAI / AI Integration",
      bullet: "Autonomous Pipeline qualifying",
      metric: "Avg. Intake Delay",
      gain: "Instant (<0.1s)",
      details: "Integrate LLM models trained entirely on your company archives. Instantly answer questions, pre-screen budgets, and book demos recursively.",
      features: ["Direct calendar booking nodes", "Lead budget qualification", "Custom system context training", "CRM database integrations"],
      accentColor: "#10B981", // emerald
      icon3D: <BrainCircuit className="w-20 h-20 text-emerald-500 drop-shadow-[0_10px_10px_rgba(16,185,129,0.5)]" />
    },
    {
      id: "web-dev",
      title: "Ultra-Fast Web Development",
      category: "Web & Software",
      bullet: "Handcrafted React/TS Engine",
      metric: "Lighthouse Score",
      gain: "99.8% Optimized",
      details: "Bypass template bloat. We compile lean TS/React builds styled with Tailwind CSS, ensuring sub-second loading for absolute conversions.",
      features: ["TypeScript type-safety stability", "Blazing-fast hydration codes", "Full CDN asset optimization", "Frictionless responsive systems"],
      accentColor: "#FF5A1F", // brand-orange-500
      icon3D: <MonitorSmartphone className="w-20 h-20 text-brand-orange-500 drop-shadow-[0_10px_10px_rgba(255,90,31,0.5)]" />
    },
    {
      id: "gbp-seo",
      title: "Advanced SEO & GBP",
      category: "Search Engine Optimization",
      bullet: "Hyperlocal Map Rankings",
      metric: "Map Pin Impressions",
      gain: "300% Boosted",
      details: "Dominate local service searches. We synchronize your map tag coordinates and optimize citation listings in absolute registries.",
      features: ["Regional authority indexing", "Map tag keyword expansion", "Feedback trigger integration", "Geotargeted picture data tags"],
      accentColor: "#F59E0B", // amber
      icon3D: <Globe2 className="w-20 h-20 text-amber-500 drop-shadow-[0_10px_10px_rgba(245,158,11,0.5)]" />
    }
  ];

  const currentService = services.find((s) => s.id === selectedService) || services[0];

  // Live Chatbot simulator
  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", text: userText }]);
    setChatInput("");
    setIsBotTyping(true);

    setTimeout(() => {
      let responseText = "Understood. Our conversion setup leverages bespoke datasets. Would you like to schedule an elite coordination brief?";
      const low = userText.toLowerCase();
      if (low.includes("estimate") || low.includes("cost") || low.includes("pricing")) {
        responseText = "Project structures starting from custom scopes. Input your metric requirements into our Project Estimator further down the front page!";
      } else if (low.includes("lead") || low.includes("meta") || low.includes("ads") || low.includes("google")) {
        responseText = "We manage programmatic Google and Meta channels. Our verified architectures drove a +190% lead volume gain for portals like YalaRide.";
      }
      setChatMessages((prev) => [...prev, { role: "bot", text: responseText }]);
      setIsBotTyping(false);
    }, 850);
  };

  // Live Compiler Simulator
  const handleCompile = () => {
    setIsCompiling(true);
    setCompileOutput("Initializing bundler...\nParsing App.tsx TSX nodes...\nApplying atomic Tailwind layouts...");
    setTimeout(() => {
      setCompileOutput((prev) => prev + "\n✓ Hydration latency: 0.2ms\n✓ Bundle compiled: 28KB (98% reduction)\n✓ Lighthouse Performance: 100/100.\nContainer active on port 3000.");
      setIsCompiling(false);
    }, 1000);
  };

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-transparent select-none text-left">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-[20%] right-[3%] w-[400px] h-[400px] bg-brand-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[2%] w-96 h-96 bg-brand-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-3 font-bold">
            // ARCHITECTURAL CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            PREMIUM BLUEPRINTS, <br />
            BUILT FOR SCALE.
          </h2>
        </div>

        {/* Master Selector layout (Split Row) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Glass Service Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {services.map((item) => {
              const isActive = item.id === selectedService;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedService(item.id)}
                  className={`text-left p-5 rounded-2xl transition-all duration-500 outline-none select-none cursor-pointer flex items-center justify-between gap-4 border ${
                    isActive
                      ? "glass-card border-white shadow-xl shadow-slate-200/50 scale-[1.02]"
                      : "bg-white/40 border-white/50 hover:bg-white/70 hover:border-white shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                      isActive ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "bg-white text-slate-500 shadow-sm"
                    }`}>
                      {item.id === "google-ads" && <Search className="w-5 h-5" />}
                      {item.id === "meta-ads" && <Share2 className="w-5 h-5" />}
                      {item.id === "ai-chatbots" && <Bot className="w-5 h-5" />}
                      {item.id === "web-dev" && <Code className="w-5 h-5" />}
                      {item.id === "gbp-seo" && <MapPin className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block tracking-widest leading-none font-bold uppercase mb-1.5">
                        {item.category}
                      </span>
                      <span className={`text-base font-bold font-sans block leading-none transition-colors ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                        {item.title.split(" (")[0]}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Premium Active Spec Glass Display Panel */}
          <div className="lg:col-span-7 perspective-[1000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService}
                initial={{ opacity: 0, rotateY: 10, x: 20 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -10, x: -20 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="glass-card p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden min-h-[650px] h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* 3D Visual Floating Icon Background Layer */}
                <motion.div 
                  className="absolute -right-10 -top-10 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
                  style={{ backgroundColor: currentService.accentColor }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="absolute right-8 top-12 z-0 opacity-20 sm:opacity-100 mix-blend-multiply"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  {currentService.icon3D}
                </motion.div>

                {/* Spec Details */}
                <div className="space-y-8 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                  
                  {/* Header */}
                  <div className="pb-6 border-b border-slate-200/50">
                    <span className="text-[10px] font-mono tracking-widest uppercase block font-bold" style={{ color: currentService.accentColor }}>
                      SPECIFICATION DOCUMENT // ID: {currentService.id.toUpperCase()}
                    </span>
                    <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                      {currentService.title}
                    </h3>
                  </div>

                  {/* Tagline & Desc */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest font-mono" style={{ color: currentService.accentColor }}>
                      <CheckCircle className="w-4 h-4" />
                      {currentService.bullet}
                    </div>
                    <p className="text-slate-600 text-base leading-relaxed font-medium max-w-lg">
                      {currentService.details}
                    </p>
                  </div>

                  {/* Bullet Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-700 bg-white/60 border border-white px-4 py-3 rounded-xl shadow-sm">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: currentService.accentColor, boxShadow: `0 0 10px ${currentService.accentColor}` }} />
                        <span className="font-bold">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stat Target Multiplier */}
                  <div className="p-6 bg-white/80 border border-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-slate-200/40">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block mb-1">
                        KPI velocity target
                      </span>
                      <span className="text-sm font-bold text-slate-900 block">
                        {currentService.metric}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-3xl font-extrabold font-mono block leading-none tracking-tight" style={{ color: currentService.accentColor }}>
                        {currentService.gain}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-bold uppercase font-mono mt-1">
                        Verified Outburst
                      </span>
                    </div>
                  </div>

                </div>

                {/* LIVE SIMULATOR SANDBOX MODULES */}
                <div className="mt-10 pt-8 border-t border-slate-200/50 relative z-10" style={{ transform: 'translateZ(40px)' }}>
                  
                  {/* SANDBOX AI: Dynamic chat sandbox */}
                  {currentService.id === "ai-chatbots" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase font-bold">
                        <span>● OpenAI Qualified Chatbot Screen</span>
                        <span className="text-emerald-500 animate-pulse">SYSTEM_ONLINE_VERIFIED</span>
                      </div>

                      <div className="bg-slate-900 rounded-2xl p-4 max-h-[160px] overflow-y-auto space-y-3 font-mono text-xs shadow-inner">
                        {chatMessages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`py-2 px-4 rounded-xl max-w-[85%] leading-relaxed ${
                              msg.role === "user" ? "bg-emerald-500 text-white font-bold" : "bg-slate-800 border border-slate-700 text-slate-300"
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                        {isBotTyping && <div className="text-slate-500 animate-pulse text-[10px]">💬 AI screening responses...</div>}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type 'pricing' or 'leads'..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                          className="flex-grow bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-400 font-medium shadow-sm"
                        />
                        <button
                          onClick={handleChatSend}
                          className="px-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors cursor-pointer shadow-md shadow-emerald-500/20"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SANDBOX CODE: Compile live bundle */}
                  {currentService.id === "web-dev" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase font-bold">
                        <span>● React TypeScript Compiler Sandbox</span>
                        <span className="text-brand-orange-500 font-mono">PORT: 3000 // ACTIVE</span>
                      </div>

                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 font-mono text-xs text-brand-orange-400 max-h-[140px] overflow-y-auto whitespace-pre-line text-left leading-relaxed shadow-inner">
                        {compileOutput}
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleCompile}
                          disabled={isCompiling}
                          className="cursor-pointer font-bold text-[10px] tracking-widest uppercase bg-slate-900 hover:bg-black text-white py-3 px-6 rounded-xl flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50 shadow-lg shadow-slate-900/20"
                        >
                          <Terminal className="w-4 h-4 text-brand-orange-500" />
                          {isCompiling ? "PACKING..." : "COMPILE SPA BUNDLE"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SANDBOX ADS: Toggle optimization parameter */}
                  {(currentService.id === "google-ads" || currentService.id === "meta-ads" || currentService.id === "gbp-seo") && (
                    <div className="p-5 bg-white/60 border border-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                      <div className="text-left space-y-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Programmatic Bid Balancing</span>
                        <span className="text-sm font-extrabold text-slate-900 block flex items-center gap-2">
                          System status: 
                          <span className={adsOptimized ? "text-emerald-500" : "text-slate-400"}>
                            {adsOptimized ? "100% Core Optimized" : "Pruned Standard"}
                          </span>
                        </span>
                      </div>
                      <button
                        onClick={() => setAdsOptimized(!adsOptimized)}
                        className={`cursor-pointer px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
                          adsOptimized ? "bg-slate-900 text-white shadow-slate-900/20" : "bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {adsOptimized ? "ACTIVE CORE BIAS" : "OPTIMIZE NOW"}
                      </button>
                    </div>
                  )}

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
