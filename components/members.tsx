"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const MEMBERS = [
  {
    name: "Philipp",
    instruments: ["Guitar", "Vocals", "Keys"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    bio: "The rhythmic engine and harmonic mastermind.",
  },
  {
    name: "Lena",
    instruments: ["Vocals", "Percussion"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    bio: "Powerhouse vocals that carry the crowd all night.",
  },
  {
    name: "Vlad",
    instruments: ["Bass", "Vocals"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    bio: "Deep grooves and foundational low frequencies.",
  },
  {
    name: "Benedikt",
    instruments: ["Drums"],
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    bio: "Precise tempo control and high-energy dynamics.",
  },
  {
    name: "David",
    instruments: ["Guitar", "Keys", "Vocals"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    bio: "Virtuoso solos and rich instrumental coloring.",
  },
];

export function Members() {
  return (
    <section className="py-24 md:py-32 relative bg-[#121214]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-gold tracking-widest text-xs uppercase font-semibold block">
            MEET THE BAND
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
            The Faces Behind The Sound
          </h2>
          <p className="text-text-muted font-light text-sm md:text-base leading-relaxed">
            A cohesive collective of professional Austrian musicians bringing energy, passion, and elite craftsmanship to every performance.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/5"
            >
              {/* Member Image */}
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className="object-cover object-center filter grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />

              {/* Static overlay content (Name and main instrument) */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 transition-transform duration-500 ease-out group-hover:translate-y-[-70px]">
                <h3 className="font-serif text-2xl font-semibold text-white tracking-wide">
                  {member.name}
                </h3>
                <p className="text-gold font-sans text-xs tracking-wider uppercase mt-1">
                  {member.instruments[0]}
                </p>
              </div>

              {/* Hover-revealed content (Full instrument list and bio) */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 opacity-0 transform translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                <div className="h-[1px] w-full bg-gold/30 mb-4" />
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {member.instruments.map((inst) => (
                    <span
                      key={inst}
                      className="px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] tracking-wide"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-text-muted leading-relaxed font-light">
                  {member.bio}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
