"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Music, ArrowRight, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

const TEASER_SONGS = [
  { title: "Johnny B. Goode", artist: "Chuck Berry", genre: "60s Rock 'n' Roll" },
  { title: "Billie Jean", artist: "Michael Jackson", genre: "80s Dance & Disco" },
  { title: "Treasure", artist: "Bruno Mars", genre: "Modern Hits" },
  { title: "Schickeria", artist: "Spider Murphy Gang", genre: "Austropop" },
  { title: "Superstition", artist: "Stevie Wonder", genre: "Classic Funk/Disco" },
  { title: "Blinding Lights", artist: "The Weeknd", genre: "Modern Hits" },
  { title: "I Am from Austria", artist: "Rainhard Fendrich", genre: "Austropop" },
];

export function MediaRepertoire() {
  return (
    <section id="media" className="py-24 md:py-32 relative bg-[#121214]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-gold tracking-widest text-xs uppercase font-semibold block">
              MEDIA & TEASER
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
              Experience the Vibe
            </h2>
          </div>
          <p className="text-text-muted font-light max-w-md md:text-right leading-relaxed text-sm">
            Take a look at our live showreel and browse through a selection of signature tunes that keep our audiences grooving.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: 16:9 Video Showreel Embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass-gold shadow-2xl group">
              <iframe
                src="https://player.vimeo.com/video/371433846?color=d4af37&title=0&byline=0&portrait=0"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="The Bowties Showreel"
              ></iframe>
            </div>
            <div className="flex items-center space-x-3 text-text-muted px-2">
              <Play size={14} className="text-gold" />
              <span className="text-xs tracking-wider font-light">Showreel: Recorded Live at Hofburg Palace, Vienna</span>
            </div>
          </motion.div>

          {/* Right Block: Repertoire Teaser List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between h-full bg-[#121214] border border-white/5 rounded-2xl p-8"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Music size={18} className="text-gold" />
                <h3 className="font-serif text-2xl font-semibold text-white">Repertoire Teaser</h3>
              </div>
              
              <p className="text-xs text-text-muted leading-relaxed font-light">
                We craft our sets dynamically based on the crowd, spanning classics and modern hits (strictly no Schlager). Here is a sneak peak:
              </p>

              {/* Song List */}
              <div className="space-y-4 pt-2">
                {TEASER_SONGS.map((song, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white tracking-wide">{song.title}</p>
                      <p className="text-[11px] text-text-muted font-light">{song.artist}</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gold-dark font-medium bg-gold/5 border border-gold/10 px-2 py-0.5 rounded-full">
                      {song.genre}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link href="/repertoire" className="w-full">
                <Button variant="outline" className="w-full group rounded-xl">
                  <span>View Full Repertoire</span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
