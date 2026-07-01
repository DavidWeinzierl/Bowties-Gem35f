import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Members } from "@/components/members";
import { Setups } from "@/components/setups";
import { MediaRepertoire } from "@/components/media-teaser";
import { GigsCalendar } from "@/components/gigs-calendar";
import { Social } from "@/components/social";
import { FooterContact } from "@/components/footer-contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0B0B0C] text-foreground flex flex-col">
      {/* Global Header Navigation */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <Hero />

        {/* Band Overview / Vibe / Genres */}
        <About />

        {/* Live Band Constellation Booking Formats */}
        <Setups />

        {/* Band Members Spotlights */}
        <Members />

        {/* Video Showreel & Song List Preview */}
        <MediaRepertoire />

        {/* Live Dates Gig Listing from Calendar Endpoint */}
        <GigsCalendar />

        {/* Carousel Reviews & Social Grid */}
        <Social />
      </main>

      {/* Accordion FAQ, Form Inquiry & Legal Footer */}
      <FooterContact />
    </div>
  );
}
