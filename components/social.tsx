"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Instagram, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const REVIEWS = [
  {
    quote: "The Bowties played at our wedding in Salzburg, and they were incredible! The dance floor was packed from the first song to the very end. Absolutely professional, energetic, and highly recommended!",
    author: "Sarah & Michael",
    event: "Wedding, Salzburg",
    rating: 5,
  },
  {
    quote: "We hired the 6-Piece Gala Setup for our annual corporate dinner in Vienna. Outstanding performance, top class styling, and a fantastic sound range. Our clients were absolutely thrilled!",
    author: "Dr. Thomas Weber",
    event: "Corporate Gala, Vienna",
    rating: 5,
  },
  {
    quote: "The energy these guys bring is infectious. The Austropop block was a massive sing-along, and the transition into 80s Disco was seamless. Will definitely book again!",
    author: "Julia & Felix",
    event: "Birthday Celebration, Graz",
    rating: 5,
  },
];

const INSTAGRAM_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop",
    alt: "Live band crowd",
  },
  {
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop",
    alt: "DJ and synth keys",
  },
  {
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
    alt: "Stage strobe lighting",
  },
  {
    url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop",
    alt: "Drum setup stage",
  },
];

export function Social() {
  const [activeReviewIdx, setActiveReviewIdx] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-24 md:py-32 relative bg-[#121214]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Testimonials Slider */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-gold tracking-widest text-xs uppercase font-semibold block">
                REVIEWS & PROOF
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                What Our Clients Say
              </h2>
            </div>

            {/* Carousel Container */}
            <div
              className="relative min-h-[300px] flex items-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  <Card className="border-white/5 bg-[#121214] p-8 md:p-10 shadow-2xl relative">
                    <MessageSquare className="absolute top-6 right-8 text-gold/10 w-16 h-16 pointer-events-none" />
                    
                    <CardContent className="p-0 space-y-6">
                      {/* Star Rating */}
                      <div className="flex space-x-1 text-gold">
                        {[...Array(REVIEWS[activeReviewIdx].rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="font-serif text-lg md:text-xl text-white italic leading-relaxed font-light">
                        &ldquo;{REVIEWS[activeReviewIdx].quote}&rdquo;
                      </p>

                      {/* Author */}
                      <div>
                        <p className="font-semibold text-white tracking-wide text-sm md:text-base">
                          {REVIEWS[activeReviewIdx].author}
                        </p>
                        <p className="text-xs text-gold mt-0.5">
                          {REVIEWS[activeReviewIdx].event}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Dots */}
            <div className="flex space-x-3 pt-2">
              {REVIEWS.map((_, rIdx) => (
                <button
                  key={rIdx}
                  onClick={() => setActiveReviewIdx(rIdx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeReviewIdx === rIdx ? "bg-gold w-8" : "bg-white/20"
                  }`}
                  aria-label={`Go to slide ${rIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Block: Simulated Instagram Feed */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-semibold text-white">Instagram Feed</h3>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold hover:text-gold-hover flex items-center gap-1.5 transition-all tracking-wider font-semibold"
              >
                @THEBOWTIES.BAND
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Instagram Grid */}
            <div className="grid grid-cols-2 gap-4">
              {INSTAGRAM_PHOTOS.map((photo, pIdx) => (
                <div
                  key={pIdx}
                  className="group relative h-40 md:h-48 rounded-xl overflow-hidden shadow-lg border border-white/5 bg-white/5"
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="text-white w-8 h-8" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Instagram size={16} className="mr-2" />
                  Follow us on Instagram
                </Button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
