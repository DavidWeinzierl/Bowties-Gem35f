import { NextResponse } from "next/server";
import ical from "node-ical";

export const dynamic = "force-dynamic";

// Helper to determine if an event is public
function isPublicEvent(summary: string = "", description: string = ""): boolean {
  const combined = `${summary} ${description}`.toLowerCase();
  
  // Explicitly public keywords
  if (
    combined.includes("public") ||
    combined.includes("öffentlich") ||
    combined.includes("konzert") ||
    combined.includes("showcase") ||
    combined.includes("festival") ||
    combined.includes("open air") ||
    combined.includes("club show")
  ) {
    return true;
  }
  
  // If it mentions private event types, it is not public
  if (
    combined.includes("private") ||
    combined.includes("wedding") ||
    combined.includes("hochzeit") ||
    combined.includes("birthday") ||
    combined.includes("geburtstag") ||
    combined.includes("corporate") ||
    combined.includes("firmenfeier") ||
    combined.includes("gala") ||
    combined.includes("closed") ||
    combined.includes("geschlossene gesellschaft")
  ) {
    return false;
  }

  // By default, assume events in a band's schedule are private bookings unless marked public
  return false;
}

export async function GET() {
  const feedUrl = process.env.ICAL_FEED_URL;

  // If the feed URL is not configured, is a placeholder, or we want to demonstrate the calendar,
  // we return empty to trigger the beautiful empty state, OR we return mock data based on a query parameter or environment.
  // Let's implement robust fallback checking.
  if (!feedUrl || feedUrl.includes("placeholder.ics")) {
    // Return empty list of public events to display the empty state.
    // This allows the user to see the "We are currently busy playing private events" design.
    return NextResponse.json({ events: [] });
  }

  try {
    const rawData = await ical.async.fromURL(feedUrl);
    const parsedEvents = [];

    const now = new Date();

    for (const key in rawData) {
      if (Object.prototype.hasOwnProperty.call(rawData, key)) {
        const item = rawData[key] as any;
        
        if (item && item.type === "VEVENT") {
          const startDate = new Date(item.start);
          
          // Only show upcoming events
          if (startDate >= now) {
            const summary = item.summary || "Live Gigs";
            const description = item.description || "";
            
            if (isPublicEvent(summary, description)) {
              parsedEvents.push({
                id: item.uid || key,
                title: summary,
                location: item.location || "Austria",
                start: item.start,
                end: item.end,
                description: description,
              });
            }
          }
        }
      }
    }

    // Sort chronologically
    parsedEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    return NextResponse.json({ events: parsedEvents });
  } catch (error) {
    console.error("Error fetching or parsing iCal feed:", error);
    // Graceful error fallback: return empty array with a warning
    return NextResponse.json(
      { events: [], warning: "Failed to load live dates from primary calendar feed." },
      { status: 200 }
    );
  }
}
