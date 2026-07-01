"use client";

import * as React from "react";
import { Calendar, MapPin, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatGigDate } from "@/lib/date";
import { Button } from "@/components/ui/button";

interface Gig {
  id: string;
  title: string;
  location: string;
  start: string;
  end: string;
  description?: string;
}

// Helper to generate dynamic future dates for mock gigs
const getFutureDate = (daysAhead: number, hours: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  date.setHours(hours, 0, 0, 0);
  return date.toISOString();
};

const MOCK_GIGS: Gig[] = [
  {
    id: "mock-1",
    title: "Town Festival Open Air",
    location: "Rathausplatz, Vienna",
    start: getFutureDate(12, 19),
    end: getFutureDate(12, 23),
    description: "Public open-air concert at the Vienna town festival. Free entry!",
  },
  {
    id: "mock-2",
    title: "Club Showcase Night",
    location: "U4 Club, Vienna",
    start: getFutureDate(26, 21),
    end: getFutureDate(27, 2),
    description: "Rocking the legendary U4 club stage. Come dance with us!",
  },
  {
    id: "mock-3",
    title: "Old Town Summer Session",
    location: "Residenzplatz, Salzburg",
    start: getFutureDate(45, 18),
    end: getFutureDate(45, 22),
    description: "Live open air session by the river. Great food and drinks available.",
  },
];

export function GigsCalendar() {
  const [gigs, setGigs] = React.useState<Gig[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Brief loading state for premium look & feel transition
    const timer = setTimeout(() => {
      setGigs(MOCK_GIGS);
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  const handleBookNow = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="dates" className="py-24 md:py-32 relative bg-[#0B0B0C]">
      {/* Background radial gold glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-gold tracking-widest text-xs uppercase font-semibold block">
            LIVE CALENDAR
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
            Upcoming Gigs
          </h2>
          <p className="text-text-muted font-light text-sm md:text-base leading-relaxed">
            Catch us live at public showcases, town festivals, and clubs across Austria.
          </p>
        </div>

        {/* Calendar Body */}
        <div className="max-w-4xl mx-auto">
          
          {loading && (
            // Skeleton Loader State
            <div className="space-y-4">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-[#121214]/60 border border-white/5 rounded-2xl animate-pulse"
                >
                  <div className="flex items-center space-x-6 w-full sm:w-auto">
                    {/* Date Block Skeleton */}
                    <div className="w-16 h-16 rounded-xl bg-white/5 flex-shrink-0" />
                    <div className="space-y-2 flex-grow">
                      {/* Title Skeleton */}
                      <div className="h-5 w-48 bg-white/5 rounded" />
                      {/* Meta Skeleton */}
                      <div className="h-3.5 w-32 bg-white/5 rounded" />
                    </div>
                  </div>
                  {/* Location Skeleton */}
                  <div className="h-5 w-28 bg-white/5 rounded mt-4 sm:mt-0" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            // Error State
            <div className="p-8 text-center glass border-red-500/20 rounded-2xl space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                <AlertTriangle size={24} />
              </div>
              <h3 className="font-serif text-lg text-white font-medium">Calendar Sync Offline</h3>
              <p className="text-xs text-text-muted leading-relaxed font-light">
                {error} We play dozens of private events monthly. Connect with us directly to inquire about your event date!
              </p>
              <Button variant="outline" size="sm" onClick={handleBookNow}>
                Contact Band
              </Button>
            </div>
          )}

          {!loading && !error && gigs.length === 0 && (
            // Beautiful Empty State
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-12 text-center glass-gold rounded-3xl space-y-6 max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto border border-gold/15">
                <Calendar size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-semibold text-white">
                  Busy with Private Galas & Weddings
                </h3>
                <p className="text-sm text-text-muted leading-relaxed font-light">
                  Our weekends are currently fully booked with private celebrations. We are busy rocking wedding stages and corporate galas.
                </p>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button variant="primary" onClick={handleBookNow}>
                  Inquire Your Date
                </Button>
                <button
                  onClick={handleBookNow}
                  className="text-xs text-gold hover:text-gold-hover hover:underline transition-all tracking-wider flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  Request Private Showcase
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          )}

          {!loading && !error && gigs.length > 0 && (
            // Gigs List View
            <div className="space-y-4">
              {gigs.map((gig, index) => {
                const formatted = formatGigDate(gig.start);
                return (
                  <motion.div
                    key={gig.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-[#121214] hover:bg-[#121214]/90 border border-white/5 hover:border-gold/15 rounded-2xl transition-all duration-300 gap-4"
                  >
                    <div className="flex items-center space-x-6 w-full sm:w-auto">
                      {/* Ticket Stub Date Component */}
                      <div className="w-16 h-16 rounded-xl bg-gold/10 border border-gold/20 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-background transition-colors duration-300">
                        <span className="text-xl font-bold font-serif leading-none text-gold group-hover:text-background">
                          {formatted.day}
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-white group-hover:text-background/80 mt-1">
                          {formatted.month}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-medium text-white group-hover:text-gold transition-colors duration-300">
                          {gig.title}
                        </h4>
                        <div className="flex items-center text-xs text-text-muted space-x-4">
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-gold-dark" />
                            {formatted.time}
                          </span>
                          <span>•</span>
                          <span className="font-light">{formatted.weekday}</span>
                        </div>
                        {gig.description && (
                          <p className="text-[11px] text-text-muted/70 font-light max-w-md line-clamp-1">
                            {gig.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Venue Location Block */}
                    <div className="flex items-center space-x-2 text-text-muted sm:text-right w-full sm:w-auto mt-2 sm:mt-0 text-sm">
                      <MapPin size={14} className="text-gold flex-shrink-0" />
                      <span className="tracking-wide font-light">{gig.location}</span>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
