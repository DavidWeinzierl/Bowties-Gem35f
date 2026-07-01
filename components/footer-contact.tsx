"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Phone, MapPin, Instagram, Facebook, Youtube, CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Form Schema via Zod
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  eventDate: z.string().min(1, "Please select an event date"),
  eventType: z.string().min(1, "Please select an event type"),
  message: z.string().min(10, "Your message must be at least 10 characters long"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// FAQ Items
const FAQS = [
  {
    question: "Do you bring your own PA / sound and lighting equipment?",
    answer: "Yes, absolutely! We bring a high-end, professional sound system and digital stage lighting suitable for events up to 400 people. For larger venues or outdoor festivals, we work closely with professional local production partners.",
  },
  {
    question: "How long do you play?",
    answer: "Our standard performance time is up to 4 hours of live music, typically split into 45 or 60-minute sets with short breaks. However, we are extremely flexible and can customize the schedule to perfectly fit your event's timeline.",
  },
  {
    question: "How far do you travel?",
    answer: "We are based in Austria and perform nationwide (Vienna, Salzburg, Graz, Linz, Kitzbühel, etc.). We are also happy to travel to neighboring regions in Germany, Switzerland, Italy, and Slovenia.",
  },
  {
    question: "Do you take special song requests?",
    answer: "Yes, especially for wedding ceremonies and first dances! We gladly learn 1-2 custom song requests to make your special moment unique. For the main dance party, we adapt our setlist dynamically based on the crowd's energy.",
  },
];

export function FooterContact() {
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      eventDate: "",
      eventType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Something went wrong. Please try again.");
      }

      setSubmitSuccess(true);
      reset();
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit booking inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIdx((prev) => (prev === index ? null : index));
  };

  return (
    <footer id="contact" className="bg-[#0B0B0C] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12 relative z-10">
        
        {/* Contact and FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20">
          
          {/* Left Block: FAQ Accordion */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-gold tracking-widest text-xs uppercase font-semibold block">
                HAVE QUESTIONS?
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
                Frequently Asked
              </h2>
              <p className="text-text-muted font-light text-sm leading-relaxed">
                Everything you need to know about booking us for your event. Can't find the answer? Ask us directly.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="border border-white/5 bg-[#121214]/40 hover:bg-[#121214]/80 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-sans text-sm tracking-wide cursor-pointer focus:outline-none"
                    >
                      <span className="font-medium pr-4">{faq.question}</span>
                      <ChevronDown
                        size={16}
                        className={`text-gold transition-transform duration-300 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-xs text-text-muted leading-relaxed font-light border-t border-white/5 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Direct Contact Details */}
            <div className="pt-6 space-y-4 border-t border-white/5">
              <h4 className="text-xs font-semibold tracking-wider text-white uppercase">Direct Contact</h4>
              <div className="space-y-3 text-sm text-text-muted">
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-gold" />
                  <a href="mailto:booking@thebowties.at" className="hover:text-white transition-colors">
                    booking@thebowties.at
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-gold" />
                  <a href="tel:+436601234567" className="hover:text-white transition-colors">
                    +43 660 1234567
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-gold" />
                  <span>Vienna & Salzburg, Austria</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Booking Contact Form */}
          <div className="lg:col-span-7 bg-[#121214] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Form glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-8 space-y-2">
                    <h3 className="font-serif text-2xl md:text-3xl text-white font-semibold">Book The Bowties</h3>
                    <p className="text-xs text-text-muted font-light">
                      Fill out the form below to receive a non-binding offer.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name & Email Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-semibold tracking-wider text-text-muted uppercase">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your Name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 font-light mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-semibold tracking-wider text-text-muted uppercase">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 font-light mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Date & Event Type Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="eventDate" className="text-xs font-semibold tracking-wider text-text-muted uppercase">
                          Event Date
                        </label>
                        <Input
                          id="eventDate"
                          type="date"
                          className="w-full text-foreground flex items-center justify-between"
                          {...register("eventDate")}
                        />
                        {errors.eventDate && (
                          <p className="text-xs text-red-500 font-light mt-1">{errors.eventDate.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="eventType" className="text-xs font-semibold tracking-wider text-text-muted uppercase">
                          Event Type
                        </label>
                        <select
                          id="eventType"
                          className="flex h-12 w-full rounded-lg border border-white/10 bg-[#121214] px-4 py-2 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all appearance-none cursor-pointer"
                          {...register("eventType")}
                        >
                          <option value="">Select event type</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Corporate Event">Corporate Event</option>
                          <option value="Gala / Prom">Gala / Prom</option>
                          <option value="Private Birthday">Private Birthday</option>
                          <option value="Public Festival">Public Festival</option>
                          <option value="Other">Other Event</option>
                        </select>
                        {errors.eventType && (
                          <p className="text-xs text-red-500 font-light mt-1">{errors.eventType.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-semibold tracking-wider text-text-muted uppercase">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your venue, location, duration, and requirements..."
                        className="min-h-[120px]"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 font-light mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Error display */}
                    {submitError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl font-light leading-relaxed">
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl flex items-center justify-center font-bold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          Processing Booking...
                        </>
                      ) : (
                        "Request Booking"
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto border border-gold/20">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl font-bold text-white">Inquiry Sent!</h3>
                    <p className="text-sm text-text-muted max-w-sm mx-auto leading-relaxed font-light">
                      Thank you! We have received your request and sent a confirmation email. We'll get back to you with a custom quote within 24-48 hours.
                    </p>
                  </div>
                  <div className="pt-6">
                    <Button
                      variant="glass"
                      onClick={() => {
                        setSubmitSuccess(false);
                      }}
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Legal Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} The Bowties. All rights reserved.
            </p>
            <p className="text-[10px] text-text-muted/50 font-light">
              Premium Austrian Event Band • Strictly No Schlager
            </p>
          </div>

          {/* Impressum & Privacy */}
          <div className="flex space-x-6 text-xs text-text-muted font-light">
            <Link href="#impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-text-muted transition-colors">
              <Instagram size={14} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-text-muted transition-colors">
              <Facebook size={14} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-text-muted transition-colors">
              <Youtube size={14} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
