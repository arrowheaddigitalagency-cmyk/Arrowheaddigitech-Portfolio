import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "rizwan",
    author: "Mohammed Rizwan",
    role: "CEO",
    company: "YalaRide",
    location: "USA",
    photo: "/images/rizwan_photo.png",
    initials: "MR",
    accentColor: "#FF5A1F",
    logo: "/images/client-logos/yalaride.png",
    rating: 5,
    quote:
      "Arrowhead helped build a powerful car rental marketplace with a smooth website, mobile app, and marketing strategy. They didn't just deliver a product — they became a growth partner. Our bookings increased by 190% within the first three months of launch.",
    result: "+190% Bookings",
    resultColor: "#FF5A1F",
  },
  {
    id: "ray",
    author: "Ray Washington",
    role: "Founder",
    company: "America Needs Nurses",
    location: "USA",
    photo: "/images/ray_photo.png",
    initials: "RW",
    accentColor: "#3B82F6",
    logo: "/images/client-logos/america-needs-nurses.png",
    rating: 5,
    quote:
      "Arrowhead transformed our healthcare marketplace vision into a complete, working platform. The recruiter portal, candidate-facing app, and marketing campaigns all came together seamlessly. They understood the sensitivity of the healthcare industry and delivered an enterprise-grade solution.",
    result: "+140% App Installs",
    resultColor: "#3B82F6",
  },
  {
    id: "gojetter",
    author: "Go Jetter Team",
    role: "Management",
    company: "Go Jetter Tours",
    location: "UAE",
    photo: null,
    initials: "GJ",
    accentColor: "#10B981",
    logo: null,
    rating: 5,
    quote:
      "We needed a complete digital overhaul — brand, website, and performance campaigns — all at once. Arrowhead delivered all three in parallel, on time, and the results were immediate. We had more qualified travel leads in our first month than the entire previous year.",
    result: "+190% Travel Leads",
    resultColor: "#10B981",
  },
];

/* ─── Five-star row ─────────────────────────────────── */
function Stars({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" style={{ color }} />
      ))}
    </div>
  );
}

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState<1 | -1>(1);
  const total               = TESTIMONIALS.length;

  const go = useCallback((next: number, direction: 1 | -1) => {
    setDir(direction);
    setActive((next + total) % total);
  }, [total]);

  /* auto-advance */
  useEffect(() => {
    const id = setInterval(() => go(active + 1, 1), 7000);
    return () => clearInterval(id);
  }, [active, go]);

  const current = TESTIMONIALS[active];

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 32, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:   (d: number) => ({ opacity: 0, x: d * -32, scale: 0.98 }),
  };

  return (
    <section id="testimonials" className="relative bg-surface-1 section-pad overflow-hidden">

      <div className="absolute inset-0 grid-texture opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange-200 to-transparent" />

      <div className="container-xl relative z-10">

        {/* ── Header ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-lg">
            <p className="section-label mb-3">Client Stories</p>
            <div className="hr-accent mb-5" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight">
              What Clients Say{" "}
              <span className="text-gradient-orange">After We Deliver.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 self-end">
            <button
              onClick={() => go(active - 1, -1)}
              className="w-11 h-11 rounded-xl border border-ink-200 bg-white flex items-center justify-center hover:border-brand-orange-400 hover:bg-brand-orange-50 hover:scale-105 active:scale-95 transition-all duration-200 group"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-ink-500 group-hover:text-brand-orange-500 transition-colors" />
            </button>
            <span className="text-sm font-700 text-ink-400 w-14 text-center tabular-nums">
              {active + 1} / {total}
            </span>
            <button
              onClick={() => go(active + 1, 1)}
              className="w-11 h-11 rounded-xl border border-ink-200 bg-white flex items-center justify-center hover:border-brand-orange-400 hover:bg-brand-orange-50 hover:scale-105 active:scale-95 transition-all duration-200 group"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-ink-500 group-hover:text-brand-orange-500 transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* ── Slider ────────────────────────────────── */}
        <div className="relative overflow-hidden">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={current.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"
            >
              {/* Main quote card */}
              <div className="card-lifted rounded-2xl p-8 sm:p-10 flex flex-col relative overflow-hidden">
                {/* Decorative quote icon */}
                <Quote
                  className="absolute top-6 right-8 w-16 h-16 opacity-[0.04] text-ink-900"
                  strokeWidth={1}
                />

                {/* Stars + result badge */}
                <div className="flex items-center justify-between mb-6">
                  <Stars count={current.rating} color={current.accentColor} />
                  <span
                    className="text-xs font-700 px-3 py-1.5 rounded-full"
                    style={{
                      background: `${current.resultColor}12`,
                      color: current.resultColor,
                      border: `1px solid ${current.resultColor}25`,
                    }}
                  >
                    {current.result}
                  </span>
                </div>

                {/* Quote text */}
                <blockquote className="flex-1 text-lg sm:text-xl font-500 text-ink-700 leading-relaxed mb-8 italic">
                  "{current.quote}"
                </blockquote>

                {/* Author */}
                <div
                  className="flex items-center gap-4 pt-6 border-t"
                  style={{ borderColor: `${current.accentColor}20` }}
                >
                  {/* Photo / avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
                    {current.photo ? (
                      <img
                        src={current.photo}
                        alt={current.author}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : null}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white font-700 text-sm"
                      style={{ background: `linear-gradient(135deg, ${current.accentColor}, ${current.accentColor}88)` }}
                    >
                      {current.initials}
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="font-700 text-ink-900 text-base">{current.author}</p>
                    <p className="text-xs text-ink-400 font-600">
                      {current.role} · {current.company} · {current.location}
                    </p>
                  </div>

                  {/* Company logo */}
                  {current.logo && (
                    <img
                      src={current.logo}
                      alt={current.company}
                      className="h-7 w-auto object-contain opacity-70 ml-2"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                </div>
              </div>

              {/* Side info card */}
              <div className="flex flex-col gap-4">
                {/* Company highlight */}
                <div
                  className="rounded-2xl p-6 border flex-1"
                  style={{
                    background: `${current.accentColor}08`,
                    borderColor: `${current.accentColor}25`,
                  }}
                >
                  <p className="text-[10px] font-800 tracking-widest uppercase text-ink-400 mb-3">Client</p>
                  <h4 className="text-2xl font-extrabold text-ink-900 mb-1">{current.company}</h4>
                  <p className="text-xs font-600 text-ink-400 mb-5">{current.location}</p>
                  <div
                    className="h-px w-full mb-5"
                    style={{ background: `${current.accentColor}20` }}
                  />
                  <p
                    className="text-3xl font-extrabold leading-none"
                    style={{ color: current.accentColor }}
                  >
                    {current.result}
                  </p>
                  <p className="text-xs font-600 text-ink-500 mt-1">Verified campaign result</p>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-2 py-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i, i > active ? 1 : -1)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === active ? "24px" : "8px",
                        height: "8px",
                        background: i === active ? current.accentColor : "#e5e7eb",
                      }}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── All clients strip ─────────────────────── */}
        <div className="mt-14 pt-10 border-t border-ink-100">
          <p className="text-center text-xs font-700 text-ink-300 uppercase tracking-widest mb-6">
            Trusted by clients across multiple industries and countries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "YalaRide", "America Needs Nurses", "Go Jetter Tours",
              "Priceless Rent-A-Car", "Cars Compound", "Atlanta Car Rental",
              "Drive Kleen", "VIP Cars", "Moiz & Sons Elevator",
            ].map((name) => (
              <span
                key={name}
                className="text-sm font-700 text-ink-300 hover:text-ink-600 transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
