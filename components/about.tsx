"use client";

import { motion } from "framer-motion";
import { Music, Disc, Radio, Mic2, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GENRES = [
  {
    title: "60s Rock 'n' Roll",
    description: "High-voltage guitar riffs and classic beats that get grandparents and teenagers dancing together.",
    icon: Music,
  },
  {
    title: "80s Dance & Disco",
    description: "Synth-driven dance floor anthems, funky bass lines, and neon-lit retro vibes that keep the energy peak high.",
    icon: Disc,
  },
  {
    title: "Modern Hits",
    description: "The hottest charts, pop blockbusters, and radio favorites parsed into high-energy live arrangements.",
    icon: Radio,
  },
  {
    title: "Austropop",
    description: "Authentic, emotional, and iconic Austrian anthems that invite everyone to sing along at the top of their lungs.",
    icon: Mic2,
  },
];

const EVENTS = [
  "Weddings",
  "Birthdays",
  "Company Celebrations",
  "Galas",
  "Proms",
];

export function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="about" className="py-24 md:py-32 relative bg-[#0B0B0C]">
      {/* Decorative ambient gold glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Intro text and Event Types */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-gold tracking-widest text-xs uppercase font-semibold block">
                WHO WE ARE
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Unmatched Energy, <br />
                Tailored for Your Stage
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-text-muted text-base md:text-lg leading-relaxed font-light"
            >
              Based in the heart of Austria, **The Bowties** are a team of top-tier professional musicians dedicated to transforming your event into an extraordinary live music experience. From emotional wedding ceremonies to high-voltage corporate dance floors, we curate the perfect live soundtrack to elevate every moment.
            </motion.p>

            {/* Event List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 pt-4"
            >
              <h4 className="text-sm font-semibold tracking-wider text-white uppercase flex items-center gap-2">
                <Sparkles size={16} className="text-gold" />
                Events We Ignite
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {EVENTS.map((event) => (
                  <div key={event} className="flex items-center space-x-3 text-text-muted">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    <span className="text-sm font-sans tracking-wide">{event}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Block: 4 Genre pillars */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {GENRES.map((genre) => {
                const IconComponent = genre.icon;
                return (
                  <motion.div key={genre.title} variants={cardVariants}>
                    <Card className="h-full border-white/5 hover:border-gold/20 hover:bg-[#121214]/90 group transition-all duration-300">
                      <CardContent className="p-8 space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-colors duration-300">
                          <IconComponent size={24} />
                        </div>
                        <h3 className="font-serif text-xl font-medium text-white group-hover:text-gold transition-colors duration-300">
                          {genre.title}
                        </h3>
                        <p className="text-sm text-text-muted leading-relaxed font-light">
                          {genre.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
