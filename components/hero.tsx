"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const handleCtaClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-40 scale-105"
        poster="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920"
      >
        <source
          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c025f1b1d390d00de005d5e533b66418&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
        {/* Fallback video if the first URL changes */}
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-band-playing-live-on-stage-under-colored-lights-40089-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Premium Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-[#0B0B0C]/80 z-10" />

      {/* Centered Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="text-gold tracking-widest text-xs md:text-sm uppercase font-semibold border-b border-gold/30 pb-2 px-4">
            PREMIUM AUSTRiAN EVENT BAND
          </span>
          
          <h1 className="font-serif text-5xl md:text-8xl font-bold tracking-tight text-white mt-4 drop-shadow-md">
            The Bowties
          </h1>
          
          <p className="font-sans text-lg md:text-2xl text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
            The Soundtrack to Your Unforgettable Event
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button variant="primary" size="lg" onClick={handleCtaClick}>
            Check Availability
          </Button>
          <Button
            variant="glass"
            size="lg"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn More
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs text-text-muted tracking-widest font-light uppercase">Scroll</span>
          <ArrowDown className="text-gold animate-bounce" size={16} />
        </motion.div>
      </div>
    </section>
  );
}
