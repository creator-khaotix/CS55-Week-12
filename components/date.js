import { parseISO, format } from 'date-fns';
 
export default function Date({ dateString }) {
  // Convert WordPress date format to ISO-8601 format
  // WordPress returns: "2025-11-05 09:19:03"
  // ISO-8601 needs: "2025-11-05T09:19:03"
  const isoDateString = dateString.replace(' ', 'T');
  const date = parseISO(isoDateString);
  return <time dateTime={isoDateString}>{format(date, 'LLLL d, yyyy')}</time>;
}