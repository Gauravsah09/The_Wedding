/**
 * Client-side iCalendar (.ics) generator.
 * Formats standard RFC 5545 VEVENT.
 */

export interface CalendarEventProps {
  title: string;
  description: string;
  location: string;
  dateIso: string; // ISO 8601 string or placeholder
}

/**
 * Formats a Date object into iCal UTC datetime format: YYYYMMDDTHHMMSSZ
 */
function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Generates and triggers download of a .ics calendar file client-side.
 */
export function generateIcsFile({
  title,
  description,
  location,
  dateIso,
}: CalendarEventProps): void {
  // If dateIso is the placeholder "[DATE_ISO]" or invalid, pick a sensible fallback 30 days ahead
  let startDate = new Date();
  if (dateIso && !dateIso.includes('[DATE_ISO]') && !isNaN(Date.parse(dateIso))) {
    startDate = new Date(dateIso);
  } else {
    startDate.setDate(startDate.getDate() + 30);
    startDate.setHours(10, 0, 0, 0);
  }

  // Default duration: 6 hours for wedding ceremony
  const endDate = new Date(startDate.getTime() + 6 * 60 * 60 * 1000);
  const now = new Date();

  // Clean strings for iCal formatting (escape newlines, commas, semicolons)
  const cleanSummary = title.replace(/,/g, '\\,').replace(/;/g, '\\;');
  const cleanDescription = description.replace(/\n/g, '\\n').replace(/,/g, '\\,');
  const cleanLocation = location.replace(/,/g, '\\,');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Digital Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${startDate.getTime()}@wedding-invitation`,
    `DTSTAMP:${formatIcsDate(now)}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:${cleanSummary}`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${cleanLocation}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${cleanSummary}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.setAttribute('download', 'wedding-invitation.ics');
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
