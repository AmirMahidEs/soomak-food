import { format } from "date-fns-jalali";

export function formatJalaliDate(date) {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  const formattedDate = format(parsedDate, "yyyy/MM/dd - HH:mm");

  return formattedDate.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}
