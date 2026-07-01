export interface FormattedDate {
  day: string;       // e.g. "15"
  month: string;     // e.g. "JUL" or "JULI"
  year: string;      // e.g. "2026"
  weekday: string;   // e.g. "Saturday" or "Samstag"
  time: string;      // e.g. "20:00"
  fullDate: string;  // e.g. "Saturday, July 15, 2026"
}

export function formatGigDate(dateInput: Date | string): FormattedDate {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  // Check for invalid date
  if (isNaN(date.getTime())) {
    return {
      day: "--",
      month: "---",
      year: "----",
      weekday: "---",
      time: "--:--",
      fullDate: "Invalid Date",
    };
  }

  const day = date.getDate().toString().padStart(2, "0");
  
  // Format month (abbreviated English or German)
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
    
  const year = date.getFullYear().toString();
  
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  const fullDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    day,
    month,
    year,
    weekday,
    time,
    fullDate,
  };
}
