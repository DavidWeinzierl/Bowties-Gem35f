"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Mic } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SETUPS = [
  {
    id: "acoustic-trio",
    name: "Acoustic Trio",
    tagline: "Intimate & Sophisticated",
    instrumentation: "Cajon, Acoustic Guitar, Bass",
    description: "Perfect for intimate settings, wedding ceremonies, Champagne receptions, or warm background vibes.",
    features: [
      "Low profile setup, fits in small spaces",
      "Ambient, acoustic rearrangements of popular hits",
      "Ideal volume control for conversation-heavy dinners",
      "3 professional vocalists for rich harmonies",
    ],
    cta: "Book Trio",
    popular: false,
  },
  {
    id: "full-5piece",
    name: "The Full 5-Piece",
    tagline: "The Ultimate Party Squad",
    instrumentation: "Drums, Guitar, Bass, Keys, Vocals",
    description: "Our flagship setup. High-energy, full band power designed to keep your dance floor packed from start to finish.",
    features: [
      "Full acoustic drums & electric instrument power",
      "Massive genre repertoire (60s to modern charts)",
      "Dynamic stage lighting & premium sound system",
      "Direct interactions & crowd-pleasing entertainment",
    ],
    cta: "Book Full Band",
    popular: true,
  },
  {
    id: "gala-6piece",
    name: "The 6-Piece Gala Setup",
    tagline: "Elite Premium Entertainment",
    instrumentation: "5-Piece Band + Saxophone",
    description: "The ultimate entertainment package. Adds a sizzling live saxophone to the full band, creating an upscale luxury atmosphere.",
    features: [
      "Live Saxophone for unmatched solos & brass styling",
      "Extended repertoire including jazz standards & soul classics",
      "Extra wide soundstage suitable for major halls & galas",
      "The ultimate premium show-stopping performance",
    ],
    cta: "Book Gala Setup",
    popular: false,
  },
];

export function Setups() {
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="setups" className="py-24 md:py-32 relative bg-[#0B0B0C]">
      {/* Background glow behind popular card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-gold tracking-widest text-xs uppercase font-semibold block">
            BOOKING CONSTELLATIONS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
            Choose Your Setup
          </h2>
          <p className="text-text-muted font-light text-sm md:text-base leading-relaxed">
            From classy acoustic dinners to high-voltage gala concerts, we offer flexible setups that fit your venue size and event energy perfectly.
          </p>
        </div>

        {/* Setups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SETUPS.map((setup, index) => (
            <motion.div
              key={setup.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="flex h-full"
            >
              <Card
                variant={setup.popular ? "gold" : "default"}
                className={`relative flex flex-col justify-between w-full h-full border hover:border-gold/30 hover:bg-[#121214]/90 transition-all duration-300 ${
                  setup.popular
                    ? "shadow-2xl shadow-gold/5 border-gold/40 lg:-translate-y-4 lg:scale-[1.03]"
                    : "border-white/5"
                }`}
              >
                {/* Popular Ribbon */}
                {setup.popular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-gold text-[#0B0B0C] text-[10px] tracking-widest font-sans font-bold uppercase flex items-center gap-1 shadow-lg shadow-gold/20">
                    <Sparkles size={10} />
                    Most Popular
                  </div>
                )}

                <CardHeader className="space-y-2 p-8 pb-4">
                  <span className="text-gold text-xs tracking-widest uppercase font-medium">
                    {setup.tagline}
                  </span>
                  <CardTitle className="text-3xl font-bold font-serif text-white mt-1">
                    {setup.name}
                  </CardTitle>
                  <CardDescription className="text-xs font-mono text-gold-dark font-medium border border-gold/10 px-3 py-1 rounded-md inline-block bg-gold/5 mt-2">
                    {setup.instrumentation}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8 pt-4 pb-4 space-y-6 flex-grow">
                  <p className="text-sm text-text-muted font-light leading-relaxed">
                    {setup.description}
                  </p>

                  <div className="h-[1px] w-full bg-white/5" />

                  <ul className="space-y-3">
                    {setup.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs text-text-muted tracking-wide leading-relaxed font-light">
                        <span className="text-gold mr-3 text-sm flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="p-8 pt-4">
                  <Button
                    variant={setup.popular ? "primary" : "glass"}
                    className="w-full text-center py-4 rounded-xl cursor-pointer"
                    onClick={handleScrollToContact}
                  >
                    {setup.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
