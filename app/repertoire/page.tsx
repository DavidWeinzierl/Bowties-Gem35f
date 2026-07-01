"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, Music, Disc, Radio, Mic2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { FooterContact } from "@/components/footer-contact";
import { Input } from "@/components/ui/input";

interface Song {
  title: string;
  artist: string;
  genre: "60s Rock 'n' Roll" | "80s Dance & Disco" | "Modern Hits" | "Austropop";
}

const REPERTOIRE_DATABASE: Song[] = [
  // 60s Rock 'n' Roll
  { title: "Johnny B. Goode", artist: "Chuck Berry", genre: "60s Rock 'n' Roll" },
  { title: "Jailhouse Rock", artist: "Elvis Presley", genre: "60s Rock 'n' Roll" },
  { title: "Twist and Shout", artist: "The Beatles", genre: "60s Rock 'n' Roll" },
  { title: "Hound Dog", artist: "Elvis Presley", genre: "60s Rock 'n' Roll" },
  { title: "I'm a Believer", artist: "The Monkees", genre: "60s Rock 'n' Roll" },
  { title: "Proud Mary", artist: "Creedence Clearwater Revival", genre: "60s Rock 'n' Roll" },
  { title: "You Never Can Tell", artist: "Chuck Berry", genre: "60s Rock 'n' Roll" },
  { title: "Stand by Me", artist: "Ben E. King", genre: "60s Rock 'n' Roll" },
  { title: "Brown Eyed Girl", artist: "Van Morrison", genre: "60s Rock 'n' Roll" },
  
  // 80s Dance & Disco
  { title: "Billie Jean", artist: "Michael Jackson", genre: "80s Dance & Disco" },
  { title: "Superstition", artist: "Stevie Wonder", genre: "80s Dance & Disco" },
  { title: "Purple Rain", artist: "Prince", genre: "80s Dance & Disco" },
  { title: "Summer of '69", artist: "Bryan Adams", genre: "80s Dance & Disco" },
  { title: "I Wanna Dance with Somebody", artist: "Whitney Houston", genre: "80s Dance & Disco" },
  { title: "Celebration", artist: "Kool & the Gang", genre: "80s Dance & Disco" },
  { title: "Take on Me", artist: "A-ha", genre: "80s Dance & Disco" },
  { title: "Livin' on a Prayer", artist: "Bon Jovi", genre: "80s Dance & Disco" },
  { title: "Sweet Child O' Mine", artist: "Guns N' Roses", genre: "80s Dance & Disco" },
  { title: "Walking on Sunshine", artist: "Katrina and the Waves", genre: "80s Dance & Disco" },

  // Modern Hits
  { title: "Treasure", artist: "Bruno Mars", genre: "Modern Hits" },
  { title: "Blinding Lights", artist: "The Weeknd", genre: "Modern Hits" },
  { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", genre: "Modern Hits" },
  { title: "Happy", artist: "Pharrell Williams", genre: "Modern Hits" },
  { title: "Shut Up and Dance", artist: "Walk the Moon", genre: "Modern Hits" },
  { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", genre: "Modern Hits" },
  { title: "Perfect", artist: "Ed Sheeran", genre: "Modern Hits" },
  { title: "Rolling in the Deep", artist: "Adele", genre: "Modern Hits" },
  { title: "Sex on Fire", artist: "Kings of Leon", genre: "Modern Hits" },
  { title: "Mr. Brightside", artist: "The Killers", genre: "Modern Hits" },
  { title: "Valerie", artist: "Amy Winehouse", genre: "Modern Hits" },

  // Austropop
  { title: "Schickeria", artist: "Spider Murphy Gang", genre: "Austropop" },
  { title: "I Am from Austria", artist: "Rainhard Fendrich", genre: "Austropop" },
  { title: "Skifoan", artist: "Wolfgang Ambros", genre: "Austropop" },
  { title: "Fürstenfeld", artist: "S.T.S.", genre: "Austropop" },
  { title: "Großvater", artist: "S.T.S.", genre: "Austropop" },
  { title: "Zwickt's mi", artist: "Wolfgang Ambros", genre: "Austropop" },
  { title: "Du entschuldige - i kenn di", artist: "Peter Cornelius", genre: "Austropop" },
  { title: "Heast as net", artist: "Hubert von Goisern", genre: "Austropop" },
];

const CATEGORIES = [
  { id: "all", label: "All Genres", icon: Music },
  { id: "60s Rock 'n' Roll", label: "60s Rock 'n' Roll", icon: Music },
  { id: "80s Dance & Disco", label: "80s Dance & Disco", icon: Disc },
  { id: "Modern Hits", label: "Modern Hits", icon: Radio },
  { id: "Austropop", label: "Austropop", icon: Mic2 },
];

export default function RepertoirePage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const filteredSongs = REPERTOIRE_DATABASE.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || song.genre === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-[#0B0B0C] text-foreground flex flex-col pt-24">
      {/* Navbar Inclusion */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-16 w-full relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs tracking-wider text-text-muted hover:text-gold uppercase font-semibold transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Title Section */}
        <div className="space-y-4 mb-16">
          <span className="text-gold tracking-widest text-xs uppercase font-semibold block">
            OUR MUSIC PORTFOLIO
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Complete Repertoire
          </h1>
          <p className="text-text-muted font-light max-w-2xl text-sm md:text-base leading-relaxed">
            Discover our extensive repertoire. We arrange every show dynamically to deliver maximum stage energy and match the unique vibe of your guests.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Search Box */}
          <div className="lg:col-span-4 relative flex items-center">
            <Search className="absolute left-4 text-text-muted" size={18} />
            <Input
              type="text"
              placeholder="Search songs or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 w-full glass border-white/10 text-white rounded-xl placeholder:text-text-muted focus:border-gold"
            />
          </div>

          {/* Genre Filters */}
          <div className="lg:col-span-8 flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-sans tracking-wide border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-gold text-[#0B0B0C] border-gold font-semibold shadow-lg shadow-gold/10"
                      : "bg-[#121214] text-text-muted border-white/5 hover:border-gold/20 hover:text-white"
                  }`}
                >
                  <Icon size={12} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Song List Results */}
        <div className="glass border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            
            <AnimatePresence mode="popLayout">
              {filteredSongs.map((song, idx) => (
                <motion.div
                  key={`${song.title}-${song.artist}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between border-b border-white/5 py-4 px-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-white tracking-wide">{song.title}</p>
                    <p className="text-xs text-text-muted font-light">{song.artist}</p>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gold-dark font-medium bg-gold/5 border border-gold/10 px-2.5 py-1 rounded-full">
                    {song.genre}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredSongs.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-20 space-y-4">
                <Music size={40} className="text-gold/20 mx-auto" />
                <h3 className="font-serif text-xl text-white font-medium">No songs found</h3>
                <p className="text-xs text-text-muted max-w-sm mx-auto font-light">
                  We couldn't find any songs matching "{searchQuery}". Try searching for another artist or song name, or browse other categories!
                </p>
              </div>
            )}

          </div>
        </div>

      </main>

      {/* Accordion FAQ, Form Inquiry & Legal Footer */}
      <FooterContact />
    </div>
  );
}
