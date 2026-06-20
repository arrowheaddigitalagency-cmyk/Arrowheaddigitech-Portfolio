import React, { useState } from "react";
import {
  Globe, Code2, Bot, Layout, Target, Megaphone,
  Search, ShoppingBag, MessageSquare, Settings,
  ArrowRight, CheckCircle2, ChevronRight,
  TrendingUp, BarChart2, MousePointer, Zap,
  ShieldCheck, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Inline SVG dashboard previews ─────────────────── */

function WebDevPreview({ color }: { color: string }) {
  return (
    <div className="preview-window w-full">
      <div className="preview-window-bar">
        <div className="preview-dot bg-[#ff5f57]" />
        <div className="preview-dot bg-[#ffbd2e]" />
        <div className="preview-dot bg-[#28c840]" />
        <div className="flex-1 mx-2 h-3 bg-ink-100 rounded-full" />
      </div>
      <div className="bg-white p-4 space-y-3">
        {/* Hero row */}
        <div className="flex gap-3">
          <div className="flex-1 space-y-2">
            <div className="h-4 rounded-md w-3/4" style={{ background: `${color}25` }} />
            <div className="h-3 rounded-md w-full bg-ink-100" />
            <div className="h-3 rounded-md w-5/6 bg-ink-100" />
            <div className="h-7 rounded-lg w-28 mt-2" style={{ background: color }} />
          </div>
          <div className="w-24 h-20 rounded-xl bg-ink-50 border border-ink-100 flex items-center justify-center shrink-0">
            <Globe className="w-8 h-8 text-ink-200" />
          </div>
        </div>
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-ink-100">
          {["3.2x", "99+", "↑145%"].map((v, i) => (
            <div key={i} className="bg-ink-50 rounded-lg p-2 text-center">
              <p className="text-xs font-800 text-ink-800">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdsPreview({ color }: { color: string }) {
  const bars = [35, 52, 44, 68, 55, 82, 64, 90, 72, 96];
  return (
    <div className="preview-window w-full">
      <div className="preview-window-bar">
        <div className="preview-dot bg-[#ff5f57]" /><div className="preview-dot bg-[#ffbd2e]" /><div className="preview-dot bg-[#28c840]" />
        <span className="text-[9px] text-ink-400 ml-2">Google Ads Dashboard</span>
      </div>
      <div className="bg-white p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10px] text-ink-400 font-600 uppercase tracking-widest">Return on Ad Spend</p>
            <p className="text-2xl font-extrabold text-ink-900">4.8<span className="text-sm font-600">x</span></p>
          </div>
          <span className="text-[10px] font-700 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">↑ 38%</span>
        </div>
        <div className="flex items-end gap-1 h-14 mb-3">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm transition-all"
              style={{ height: `${h}%`, background: i >= 7 ? color : `${color}40` }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-ink-50 rounded-lg p-2">
            <p className="text-[9px] text-ink-400 font-600">CPA</p>
            <p className="text-sm font-800 text-ink-900">-42%</p>
          </div>
          <div className="bg-ink-50 rounded-lg p-2">
            <p className="text-[9px] text-ink-400 font-600">Conv. Rate</p>
            <p className="text-sm font-800 text-ink-900">6.4%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiChatPreview({ color }: { color: string }) {
  const msgs = [
    { from: "user", text: "What's your pricing?" },
    { from: "bot",  text: "Happy to help! Our plans start from $499/mo. Want me to book a call?" },
    { from: "user", text: "Yes please" },
    { from: "bot",  text: "✅ Call booked for tomorrow 10am. You'll get a confirmation email." },
  ];
  return (
    <div className="preview-window w-full">
      <div className="preview-window-bar">
        <div className="preview-dot bg-[#ff5f57]" /><div className="preview-dot bg-[#ffbd2e]" /><div className="preview-dot bg-[#28c840]" />
        <div className="flex items-center gap-1.5 ml-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[9px] text-ink-500">AI Assistant · Online</span>
        </div>
      </div>
      <div className="bg-white p-3 space-y-2 min-h-[120px]">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className="px-3 py-1.5 rounded-xl text-[10px] font-500 max-w-[80%]"
              style={m.from === "bot"
                ? { background: `${color}12`, color: "#1f2937", border: `1px solid ${color}25` }
                : { background: "#f3f4f6", color: "#1f2937" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeoPreview({ color }: { color: string }) {
  const keywords = [
    { kw: "car rental lahore",    pos: 1, vol: "2.4k" },
    { kw: "rent a car near me",   pos: 3, vol: "8.1k" },
    { kw: "affordable car hire",  pos: 2, vol: "1.9k" },
  ];
  return (
    <div className="preview-window w-full">
      <div className="preview-window-bar">
        <div className="preview-dot bg-[#ff5f57]" /><div className="preview-dot bg-[#ffbd2e]" /><div className="preview-dot bg-[#28c840]" />
        <span className="text-[9px] text-ink-400 ml-2">SEO Rankings</span>
      </div>
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-700 text-ink-500 uppercase tracking-widest">Keyword Positions</p>
          <span className="text-[10px] font-700 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+300% traffic</span>
        </div>
        <div className="space-y-2">
          {keywords.map((k) => (
            <div key={k.kw} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-800 text-white shrink-0"
                style={{ background: k.pos === 1 ? "#f59e0b" : color }}>
                #{k.pos}
              </div>
              <p className="flex-1 text-[10px] font-600 text-ink-700 truncate">{k.kw}</p>
              <span className="text-[9px] text-ink-400">{k.vol}/mo</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EcomPreview({ color }: { color: string }) {
  const products = [
    { name: "Pro Package", price: "$299", sales: 142 },
    { name: "Starter Kit",  price: "$99",  sales: 381 },
    { name: "Enterprise",   price: "$999", sales: 28  },
  ];
  return (
    <div className="preview-window w-full">
      <div className="preview-window-bar">
        <div className="preview-dot bg-[#ff5f57]" /><div className="preview-dot bg-[#ffbd2e]" /><div className="preview-dot bg-[#28c840]" />
        <span className="text-[9px] text-ink-400 ml-2">Store Dashboard</span>
      </div>
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[9px] text-ink-400 font-600 uppercase tracking-widest">Total Revenue</p>
            <p className="text-xl font-extrabold text-ink-900">$84,210</p>
          </div>
          <span className="text-[10px] font-700 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+180%</span>
        </div>
        <div className="space-y-1.5">
          {products.map((p) => (
            <div key={p.name} className="flex items-center gap-2 py-1.5 border-b border-ink-50 last:border-0">
              <div className="w-1.5 h-6 rounded-full shrink-0" style={{ background: color }} />
              <p className="flex-1 text-[10px] font-600 text-ink-700">{p.name}</p>
              <span className="text-[10px] font-800 text-ink-900">{p.price}</span>
              <span className="text-[9px] text-ink-400">{p.sales} sold</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GenericPreview({ color, icon: Icon, label }: { color: string; icon: React.ElementType; label: string }) {
  const IconComponent = Icon as React.FC<{ className?: string; style?: React.CSSProperties }>;
  return (
    <div className="preview-window w-full">
      <div className="preview-window-bar">
        <div className="preview-dot bg-[#ff5f57]" /><div className="preview-dot bg-[#ffbd2e]" /><div className="preview-dot bg-[#28c840]" />
      </div>
      <div className="bg-white p-6 flex flex-col items-center justify-center min-h-[120px] gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <IconComponent className="w-6 h-6" style={{ color }} />
        </div>
        <p className="text-xs font-700 text-ink-400 text-center">{label}</p>
      </div>
    </div>
  );
}

/* ─── Service data ───────────────────────────────────── */
const SERVICES = [
  {
    id: "web-dev",       icon: Code2,         color: "#FF5A1F",
    title: "Website Development",
    headline: "High-performance websites built to convert.",
    description: "We engineer custom React and Next.js websites that load fast, rank well, and turn visitors into paying customers. Every pixel is intentional. Every interaction is optimized.",
    outcome: "A conversion-ready website that represents your brand at its best.",
    metric: { value: "3.2x", label: "Avg. Conversion Lift" },
    features: ["Custom design & development", "Mobile-first responsive build", "CMS integration", "Performance optimized"],
    preview: "web",
  },
  {
    id: "wordpress",     icon: Layout,        color: "#3B82F6",
    title: "WordPress Development",
    headline: "Professional WordPress sites. Zero templates.",
    description: "Custom-built WordPress themes and plugins that give you complete control. We build WordPress sites that look nothing like WordPress — enterprise-grade, scalable, and easy to manage.",
    outcome: "A powerful, manageable WordPress platform your team can own.",
    metric: { value: "99+", label: "PageSpeed Score" },
    features: ["Custom theme development", "Plugin architecture", "WooCommerce integration", "SEO-ready markup"],
    preview: "web",
  },
  {
    id: "ai-website",    icon: Bot,           color: "#8B5CF6",
    title: "AI Website Creation",
    headline: "Websites that work while you sleep.",
    description: "AI-integrated websites that personalize content, qualify leads, and automate customer journeys 24/7. Not chatbots bolted on — intelligence baked into the architecture from day one.",
    outcome: "A website that actively generates business, not just receives visitors.",
    metric: { value: "24/7", label: "Lead Qualification" },
    features: ["AI content personalization", "Automated lead scoring", "Smart CTAs", "Behavioral analytics"],
    preview: "ai",
  },
  {
    id: "landing-pages", icon: Target,        color: "#F59E0B",
    title: "Landing Pages",
    headline: "Pages engineered for a single outcome.",
    description: "High-converting landing pages built specifically for campaigns. Every section, headline, and button is crafted around one goal: getting the visitor to take action.",
    outcome: "Campaign-ready pages that dramatically lower your cost per lead.",
    metric: { value: "65%", label: "Higher Conversion Rate" },
    features: ["A/B test ready", "Campaign-specific copy", "Fast load times", "Analytics built in"],
    preview: "web",
  },
  {
    id: "google-ads",    icon: Search,        color: "#10B981",
    title: "Google Ads",
    headline: "Only pay for clicks that become customers.",
    description: "We run Google Ads campaigns with a revenue-first mindset. Keyword strategy, bid management, and landing page alignment — all tuned to lower your CPA and maximize ROAS.",
    outcome: "Predictable lead flow with transparent ROI reporting.",
    metric: { value: "4.8x", label: "Average ROAS" },
    features: ["Search & Display campaigns", "Smart bidding strategies", "Negative keyword management", "Weekly performance reports"],
    preview: "ads",
  },
  {
    id: "meta-ads",      icon: Megaphone,     color: "#3B82F6",
    title: "Meta Ads",
    headline: "Social ads that build audiences and revenue.",
    description: "Facebook and Instagram campaigns that go beyond reach. We build audiences, test creatives, and optimize continuously until your cost per acquisition is consistently profitable.",
    outcome: "A scalable paid social engine generating consistent leads.",
    metric: { value: "-42%", label: "Cost Per Lead" },
    features: ["Audience segmentation", "Creative testing framework", "Retargeting funnels", "Cross-platform reporting"],
    preview: "ads",
  },
  {
    id: "seo",           icon: Globe,         color: "#FF5A1F",
    title: "SEO & Local SEO",
    headline: "Rank where your customers are searching.",
    description: "Technical SEO, content strategy, and local search optimization that builds long-term organic growth. We make sure Google recommends you before your competitors.",
    outcome: "Sustainable organic traffic that compounds over time.",
    metric: { value: "+300%", label: "Organic Traffic Growth" },
    features: ["Technical SEO audit", "Google Business optimization", "Local citation building", "Monthly ranking reports"],
    preview: "seo",
  },
  {
    id: "ecommerce",     icon: ShoppingBag,   color: "#EC4899",
    title: "E-Commerce Development",
    headline: "Online stores built to sell at scale.",
    description: "Shopify and WooCommerce stores designed for high-volume sales. Seamless UX, optimized checkout flows, and integrated marketing tools — built for growth from the first order.",
    outcome: "A revenue-generating e-commerce platform with zero friction checkout.",
    metric: { value: "+180%", label: "Average Revenue Increase" },
    features: ["Shopify & WooCommerce", "Custom checkout optimization", "Inventory management", "Payment gateway integration"],
    preview: "ecom",
  },
  {
    id: "ai-chatbots",   icon: MessageSquare, color: "#8B5CF6",
    title: "AI Chatbots",
    headline: "Your best salesperson, fully automated.",
    description: "Custom AI chatbots that qualify leads, answer questions, and book meetings — automatically. Trained on your business, integrated with your CRM, and live around the clock.",
    outcome: "Never miss a lead again. Automated qualification 24/7.",
    metric: { value: "3x", label: "More Leads Captured" },
    features: ["Custom AI training", "CRM integration", "Multi-channel deployment", "Lead qualification flows"],
    preview: "ai",
  },
  {
    id: "website-mgmt",  icon: Settings,      color: "#10B981",
    title: "Website Management",
    headline: "Your website, always fast. Always secure.",
    description: "Ongoing website maintenance, security monitoring, content updates, and performance optimization. We keep your digital asset in peak condition so you can focus on your business.",
    outcome: "Peace of mind that your website is always performing at its best.",
    metric: { value: "99.9%", label: "Uptime Guarantee" },
    features: ["Monthly updates & backups", "Security monitoring", "Performance audits", "Priority support"],
    preview: "generic-settings",
  },
];

/* ─── Preview renderer ───────────────────────────────── */
function ServicePreview({ service }: { service: typeof SERVICES[0] }) {
  const Icon = service.icon;
  switch (service.preview) {
    case "web":   return <WebDevPreview  color={service.color} />;
    case "ads":   return <AdsPreview     color={service.color} />;
    case "ai":    return <AiChatPreview  color={service.color} />;
    case "seo":   return <SeoPreview     color={service.color} />;
    case "ecom":  return <EcomPreview    color={service.color} />;
    default:      return <GenericPreview color={service.color} icon={Icon} label={service.title} />;
  }
}

/* ─── Sidebar service button ─────────────────────────── */
function ServiceBtn({ service, isActive, onClick }: {
  key?: React.Key;
  service: typeof SERVICES[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = service.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 border group ${
        isActive
          ? "bg-white border-ink-200 shadow-md"
          : "bg-transparent border-transparent hover:bg-white/70 hover:border-ink-100"
      }`}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ background: `${service.color}18` }}>
        <Icon className="w-4 h-4" style={{ color: service.color }} />
      </div>
      <p className={`text-sm font-700 flex-1 truncate transition-colors ${isActive ? "text-ink-900" : "text-ink-500 group-hover:text-ink-800"}`}>
        {service.title}
      </p>
      <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${isActive ? "opacity-100 translate-x-0.5" : "opacity-0 group-hover:opacity-40"}`}
        style={{ color: service.color }} />
    </button>
  );
}

/* ─── Main export ────────────────────────────────────── */
export default function InteractiveServices() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];
  const ActiveIcon = active.icon;

  return (
    <section id="services" className="relative bg-white section-pad overflow-hidden">
      <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />

      <div className="container-xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <p className="section-label mb-3">What We Build</p>
            <div className="hr-accent mb-5" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight">
              10 Services.{" "}
              <span className="text-gradient-orange">One Growth Partner.</span>
            </h2>
          </div>
          <p className="text-base text-ink-500 max-w-xs leading-relaxed">
            Everything you need to build, launch, and grow — under one roof.
          </p>
        </motion.div>

        {/* Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">

          {/* Left list */}
          <div className="bg-surface-1 rounded-2xl p-2.5 border border-ink-100 flex flex-col gap-0.5 h-fit lg:sticky lg:top-24">
            {SERVICES.map((s) => (
              <ServiceBtn key={s.id} service={s} isActive={s.id === activeId} onClick={() => setActiveId(s.id)} />
            ))}
          </div>

          {/* Right detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="card-lifted rounded-2xl overflow-hidden"
            >
              {/* Accent bar */}
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${active.color} 0%, ${active.color}40 60%, transparent 100%)` }} />

              <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-0">

                {/* Left: content */}
                <div className="p-8 sm:p-10 border-r border-ink-100">
                  <div className="flex items-start gap-4 mb-7">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ background: `${active.color}15` }}
                    >
                      <ActiveIcon className="w-6 h-6" style={{ color: active.color }} />
                    </motion.div>
                    <div>
                      <p className="text-[10px] font-800 tracking-widest uppercase mb-1" style={{ color: active.color }}>Service</p>
                      <h3 className="text-xl font-800 text-ink-900">{active.title}</h3>
                    </div>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-extrabold text-ink-900 leading-tight mb-4">{active.headline}</h4>
                  <p className="text-sm text-ink-500 leading-relaxed mb-7">{active.description}</p>

                  {/* Metric + outcome */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                    <div className="metric-highlight p-5 rounded-xl">
                      <p className="text-[10px] font-700 uppercase tracking-widest text-ink-400 mb-2">Key Metric</p>
                      <p className="text-4xl font-extrabold leading-none mb-1" style={{ color: active.color }}>{active.metric.value}</p>
                      <p className="text-xs font-600 text-ink-500">{active.metric.label}</p>
                    </div>
                    <div className="rounded-xl p-5 bg-surface-1 border border-ink-100">
                      <p className="text-[10px] font-700 uppercase tracking-widest text-ink-400 mb-2">Your Outcome</p>
                      <p className="text-sm font-600 text-ink-700 leading-relaxed">{active.outcome}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {active.features.map((f, i) => (
                      <motion.div
                        key={f}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: active.color }} />
                        <span className="text-sm font-600 text-ink-700">{f}</span>
                      </motion.div>
                    ))}
                  </div>

                  <a href="#contact" className="btn-primary btn-primary-shimmer inline-flex text-sm">
                    Get a Proposal
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Right: visual preview */}
                <div className="p-6 flex flex-col gap-4 bg-surface-1 hidden xl:flex">
                  <p className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">Live Preview</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id + "-preview"}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ServicePreview service={active} />
                    </motion.div>
                  </AnimatePresence>

                  {/* Trust indicators */}
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { icon: ShieldCheck, text: "NDA on request", color: "#10B981" },
                      { icon: Clock,       text: "Fast turnaround", color: "#3B82F6" },
                    ].map(({ icon: Icon, text, color }) => (
                      <div key={text} className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                        <span className="text-xs font-600 text-ink-500">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
