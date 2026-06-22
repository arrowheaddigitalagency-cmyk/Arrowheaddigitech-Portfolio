import React, { useState } from "react";
import {
  Globe, Code2, Bot, Layout, Target, Megaphone,
  Search, ShoppingBag, MessageSquare, Settings,
  ArrowRight, CheckCircle2, ChevronRight,
  TrendingUp, BarChart2, MousePointer, Zap,
  ShieldCheck, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Premium Browser Frame ──────────────────────────── */
function BrowserFrame({ image, alt, accent }: { image: string; alt: string; accent: string }) {
  return (
    <div className="w-full select-none" style={{ filter: "drop-shadow(0 28px 56px rgba(10,13,20,0.18)) drop-shadow(0 6px 12px rgba(10,13,20,0.1))" }}>
      <div className="bg-[#f5f5f7] rounded-t-[12px] border-t border-x border-[#d4d4d6]">
        {/* Browser bar */}
        <div className="h-[32px] flex items-center px-4 gap-2 z-20">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          <div className="flex-1 mx-4 bg-[#e9e9eb] rounded-md h-[20px] flex items-center px-3 border border-[#d4d4d6]">
            <div className="w-2 h-2 rounded-sm mr-2" style={{ background: accent + "80" }} />
            <span className="text-[10px] text-[#888] truncate">{alt}</span>
          </div>
        </div>
        {/* Screen */}
        <div className="w-full aspect-[4/3] bg-[#0f172a] overflow-hidden relative border-t border-[#d4d4d6]">
          <img
            src={image} alt={alt}
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={(e) => { e.currentTarget.style.opacity = "0"; }}
          />
        </div>
      </div>
      <div className="h-[12px] bg-gradient-to-b from-[#e2e3e5] to-[#d4d5d7] rounded-b-[12px] border-x border-b border-[#c0c1c3]" />
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
    image: "/images/services/website-development.jpg",
  },
  {
    id: "wordpress",     icon: Layout,        color: "#3B82F6",
    title: "WordPress Development",
    headline: "Professional WordPress sites. Zero templates.",
    description: "Custom-built WordPress themes and plugins that give you complete control. We build WordPress sites that look nothing like WordPress — enterprise-grade, scalable, and easy to manage.",
    outcome: "A powerful, manageable WordPress platform your team can own.",
    metric: { value: "99+", label: "PageSpeed Score" },
    features: ["Custom theme development", "Plugin architecture", "WooCommerce integration", "SEO-ready markup"],
    image: "/images/services/wordpress-development.jpg",
  },
  {
    id: "ai-website",    icon: Bot,           color: "#8B5CF6",
    title: "AI Website Creation",
    headline: "Websites that work while you sleep.",
    description: "AI-integrated websites that personalize content, qualify leads, and automate customer journeys 24/7. Not chatbots bolted on — intelligence baked into the architecture from day one.",
    outcome: "A website that actively generates business, not just receives visitors.",
    metric: { value: "24/7", label: "Lead Qualification" },
    features: ["AI content personalization", "Automated lead scoring", "Smart CTAs", "Behavioral analytics"],
    image: "/images/services/ai-website-creation.jpg",
  },
  {
    id: "landing-pages", icon: Target,        color: "#F59E0B",
    title: "Landing Pages",
    headline: "Pages engineered for a single outcome.",
    description: "High-converting landing pages built specifically for campaigns. Every section, headline, and button is crafted around one goal: getting the visitor to take action.",
    outcome: "Campaign-ready pages that dramatically lower your cost per lead.",
    metric: { value: "65%", label: "Higher Conversion Rate" },
    features: ["A/B test ready", "Campaign-specific copy", "Fast load times", "Analytics built in"],
    image: "/images/services/landing-pages.jpg",
  },
  {
    id: "google-ads",    icon: Search,        color: "#10B981",
    title: "Google Ads",
    headline: "Only pay for clicks that become customers.",
    description: "We run Google Ads campaigns with a revenue-first mindset. Keyword strategy, bid management, and landing page alignment — all tuned to lower your CPA and maximize ROAS.",
    outcome: "Predictable lead flow with transparent ROI reporting.",
    metric: { value: "4.8x", label: "Average ROAS" },
    features: ["Search & Display campaigns", "Smart bidding strategies", "Negative keyword management", "Weekly performance reports"],
    image: "/images/services/google-ads.jpg",
  },
  {
    id: "meta-ads",      icon: Megaphone,     color: "#3B82F6",
    title: "Meta Ads",
    headline: "Social ads that build audiences and revenue.",
    description: "Facebook and Instagram campaigns that go beyond reach. We build audiences, test creatives, and optimize continuously until your cost per acquisition is consistently profitable.",
    outcome: "A scalable paid social engine generating consistent leads.",
    metric: { value: "-42%", label: "Cost Per Lead" },
    features: ["Audience segmentation", "Creative testing framework", "Retargeting funnels", "Cross-platform reporting"],
    image: "/images/services/meta-ads.jpg",
  },
  {
    id: "seo",           icon: Globe,         color: "#FF5A1F",
    title: "SEO & Local SEO",
    headline: "Rank where your customers are searching.",
    description: "Technical SEO, content strategy, and local search optimization that builds long-term organic growth. We make sure Google recommends you before your competitors.",
    outcome: "Sustainable organic traffic that compounds over time.",
    metric: { value: "+300%", label: "Organic Traffic Growth" },
    features: ["Technical SEO audit", "Google Business optimization", "Local citation building", "Monthly ranking reports"],
    image: "/images/services/seo-local-seo.jpg",
  },
  {
    id: "ecommerce",     icon: ShoppingBag,   color: "#EC4899",
    title: "E-Commerce Development",
    headline: "Online stores built to sell at scale.",
    description: "Shopify and WooCommerce stores designed for high-volume sales. Seamless UX, optimized checkout flows, and integrated marketing tools — built for growth from the first order.",
    outcome: "A revenue-generating e-commerce platform with zero friction checkout.",
    metric: { value: "+180%", label: "Average Revenue Increase" },
    features: ["Shopify & WooCommerce", "Custom checkout optimization", "Inventory management", "Payment gateway integration"],
    image: "/images/services/ecommerce.jpg",
  },
  {
    id: "ai-chatbots",   icon: MessageSquare, color: "#8B5CF6",
    title: "AI Chatbots",
    headline: "Your best salesperson, fully automated.",
    description: "Custom AI chatbots that qualify leads, answer questions, and book meetings — automatically. Trained on your business, integrated with your CRM, and live around the clock.",
    outcome: "Never miss a lead again. Automated qualification 24/7.",
    metric: { value: "3x", label: "More Leads Captured" },
    features: ["Custom AI training", "CRM integration", "Multi-channel deployment", "Lead qualification flows"],
    image: "/images/services/ai-chatbot.jpg",
  },
  {
    id: "website-mgmt",  icon: Settings,      color: "#10B981",
    title: "Website Management",
    headline: "Your website, always fast. Always secure.",
    description: "Ongoing website maintenance, security monitoring, content updates, and performance optimization. We keep your digital asset in peak condition so you can focus on your business.",
    outcome: "Peace of mind that your website is always performing at its best.",
    metric: { value: "99.9%", label: "Uptime Guarantee" },
    features: ["Monthly updates & backups", "Security monitoring", "Performance audits", "Priority support"],
    image: "/images/services/website-management.jpg",
  },
];

/* ─── Preview renderer ───────────────────────────────── */
function ServicePreview({ service }: { service: typeof SERVICES[0] }) {
  return <BrowserFrame image={service.image} alt={service.title} accent={service.color} />;
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
