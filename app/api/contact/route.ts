import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  eventDate: z.string().min(1, "Please select an event date"),
  eventType: z.string().min(1, "Please select an event type"),
  message: z.string().min(10, "Your message must be at least 10 characters long"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side Zod validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, eventDate, eventType, message } = result.data;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || "The Bowties Website <no-reply@thebowties.at>";
    const smtpTo = process.env.SMTP_TO || "booking@thebowties.at";

    console.log("Contact Request Received:", { name, email, eventDate, eventType, message });

    // Check if SMTP is configured
    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Email text and HTML template to band manager
      const mailOptions = {
        from: smtpFrom,
        to: smtpTo,
        replyTo: `${name} <${email}>`,
        subject: `New Booking Inquiry: ${eventType} on ${eventDate} by ${name}`,
        text: `
You have received a new booking inquiry from the website.

Name: ${name}
Email: ${email}
Event Date: ${eventDate}
Event Type: ${eventType}

Message:
${message}
        `,
        html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1a202c;">
  <div style="background-color: #0b0b0c; padding: 20px; border-radius: 6px 6px 0 0; text-align: center;">
    <h1 style="color: #d4af37; margin: 0; font-family: Georgia, serif;">The Bowties Booking</h1>
  </div>
  <div style="padding: 20px;">
    <h2 style="color: #2d3748; margin-top: 0; border-bottom: 2px solid #f7fafc; padding-bottom: 10px;">Inquiry Details</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #4a5568; width: 120px;">Name:</td>
        <td style="padding: 8px 0; color: #1a202c;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Email:</td>
        <td style="padding: 8px 0; color: #1a202c;"><a href="mailto:${email}" style="color: #d4af37; text-decoration: none;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Event Date:</td>
        <td style="padding: 8px 0; color: #1a202c;">${eventDate}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Event Type:</td>
        <td style="padding: 8px 0; color: #1a202c;">${eventType}</td>
      </tr>
    </table>
    <h3 style="color: #2d3748; margin-top: 20px; border-bottom: 1px solid #edf2f7; padding-bottom: 5px;">Message</h3>
    <p style="color: #4a5568; line-height: 1.6; white-space: pre-wrap;">${message}</p>
  </div>
  <div style="text-align: center; font-size: 12px; color: #718096; margin-top: 30px; border-top: 1px solid #edf2f7; padding-top: 15px;">
    Sent from The Bowties contact form.
  </div>
</div>
        `,
      };

      // Send the email to the band
      await transporter.sendMail(mailOptions);

      // Send an auto-acknowledgement email to the client
      try {
        const autoRespondOptions = {
          from: smtpFrom,
          to: `${name} <${email}>`,
          subject: `We received your inquiry! - The Bowties`,
          text: `
Hello ${name},

Thank you for contacting The Bowties! We have successfully received your inquiry for your upcoming ${eventType} on ${eventDate}.

We are checking our availability and will get back to you with a detailed quote as soon as possible (usually within 24-48 hours).

Musikalische Grüße,
The Bowties
https://thebowties.at
          `,
          html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #fafafa; color: #1a202c;">
  <div style="background-color: #0b0b0c; padding: 20px; border-radius: 6px 6px 0 0; text-align: center;">
    <h1 style="color: #d4af37; margin: 0; font-family: Georgia, serif;">The Bowties</h1>
  </div>
  <div style="padding: 20px; background-color: #ffffff; border-radius: 0 0 6px 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="font-size: 16px; line-height: 1.5; color: #2d3748;">Hello ${name},</p>
    <p style="line-height: 1.6; color: #4a5568;">Thank you for reaching out to us! We have received your inquiry for your <strong>${eventType}</strong> on <strong>${eventDate}</strong>.</p>
    <p style="line-height: 1.6; color: #4a5568;">We will review our calendar and details, and get back to you with a tailored offer within the next 24-48 hours.</p>
    <p style="line-height: 1.6; color: #4a5568;">In the meantime, feel free to browse our repertoire or watch our live recordings.</p>
    <br/>
    <p style="margin: 0; font-weight: bold; color: #0b0b0c;">Best regards,</p>
    <p style="margin: 5px 0 0 0; color: #d4af37; font-weight: bold;">The Bowties</p>
    <p style="margin: 0; font-size: 12px; color: #a0aec0;"><a href="https://thebowties.at" style="color: #a0aec0; text-decoration: underline;">thebowties.at</a></p>
  </div>
</div>
          `,
        };
        await transporter.sendMail(autoRespondOptions);
      } catch (err) {
        console.error("Failed to send auto-acknowledgment email:", err);
        // Do not crash the response since the main notification mail succeeded
      }
    } else {
      console.log("SMTP not configured. Message simulated successfully in logs.");
    }

    return NextResponse.json({ success: true, message: "Thank you! Your inquiry has been sent successfully." });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while sending your message. Please try again later." },
      { status: 500 }
    );
  }
}
