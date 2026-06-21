interface RsvpEmailProps {
  firstName: string;
  guestId: string;
  guestCount: string;
  message?: string;
  editLink: string;
}

function generateICS(): string {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Adedamola & Oluwaseun Wedding//EN",
    "BEGIN:VEVENT",
    "UID:adedamola-oluwaseun-wedding-2026@yourdomain.com",
    "DTSTAMP:20260101T000000Z",
    "DTSTART:20260815T090000Z",
    "DTEND:20260815T220000Z",
    "SUMMARY:Adedamola & Oluwaseun's Wedding",
    "DESCRIPTION:Join us as we celebrate our wedding ceremony and reception.",
    "LOCATION:The Cathedral Of ST Barnabas\\, Sabo-Oke\\, Ilorin\\, Kwara State",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return Buffer.from(ics).toString("base64");
}

export function generateRsvpConfirmationEmail(props: RsvpEmailProps): string {
  const { firstName, guestId, guestCount, message, editLink } = props;

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; line-height: 1.6;">
      <h2 style="text-align: center; color: #d4af37; font-family: Georgia, 'Times New Roman', serif; font-weight: normal; font-size: 28px; letter-spacing: 0.02em;">Thank You, ${firstName}!</h2>
      
      <p>We're thrilled to celebrate with you on <strong>Saturday, 15 August 2026</strong>.</p>
      
      <h3 style="color: #d4af37; margin-top: 30px; font-family: Georgia, 'Times New Roman', serif; font-weight: normal; font-size: 18px; letter-spacing: 0.04em; text-transform: uppercase;">Your RSVP Details</h3>
      <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #d4af37;">
        <p><strong>Guest ID:</strong> ${guestId}</p>
        <p><strong>Number of Guests:</strong> ${guestCount}</p>
        <p><strong>Events:</strong> <strong>RECEPTION</strong></p>
        ${message ? `<p><strong>Your Message:</strong> "${message}"</p>` : ""}
      </div>
      
      <h3 style="color: #d4af37; margin-top: 30px; font-family: Georgia, 'Times New Roman', serif; font-weight: normal; font-size: 18px; letter-spacing: 0.04em; text-transform: uppercase;">Event Details</h3>
      <div style="background: #f9f9f9; padding: 15px;">
        <p><strong>Ceremony</strong></p>
        <p>The Cathedral Of ST Barnabas</p>
        <p><strong>Time:</strong> 10:00 AM</p>
        <p><a href="https://maps.app.goo.gl/EnPQ2EhFdyoV5yie6" style="color: #d4af37; text-decoration: none;">📍 View on Google Maps</a></p>
        
        <p style="margin-top: 20px;"><strong>Reception</strong></p>
        <p>Diamond Arena</p>
        <p><strong>Time:</strong> 1:00 PM</p>
        <p><a href="https://maps.app.goo.gl/ufAkMH9yKBJBnast5" style="color: #d4af37; text-decoration: none;">📍 View on Google Maps</a></p>
        
        <p style="margin-top: 20px;"><strong>Dress Code:</strong> Burgundy, Peach, Gold. Check website for more details</p>
      </div>
      
      <h3 style="color: #d4af37; margin-top: 30px;">Add to Your Calendar</h3>
      <p>
        <a href="https://calendar.google.com/calendar/r/eventedit?text=Ada+%26+Emmanuel+Wedding&dates=20260815/20260815&details=Join+us+for+the+wedding+of+Ada+and+Emmanuel" style="color: #d4af37; text-decoration: none; margin-right: 15px;">📅 Google Calendar</a>
        <a href="data:text/calendar;base64,${generateICS()}" download="wedding.ics" style="color: #d4af37; text-decoration: none;">📅 Apple Calendar</a>
      </p>
      
      <h3 style="color: #d4af37; margin-top: 30px; font-family: Georgia, 'Times New Roman', serif; font-weight: normal; font-size: 18px; letter-spacing: 0.04em; text-transform: uppercase;">Need to Update Your RSVP?</h3>
      <p>No problem! You can update or cancel your RSVP by clicking the link below:</p>
      <p style="text-align: center; margin: 20px 0;">
        <a href="${editLink}" style="background: #d4af37; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Manage Your RSVP
        </a>
      </p>
      
      <p style="text-align: center; margin-top: 40px; color: #d4af37; font-style: italic;">
        #AdeOluwa26
      </p>
    </div>
  `;
}
