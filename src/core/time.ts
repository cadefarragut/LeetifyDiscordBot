// Takes current time, gets the current month, changes it to the beginning of the month
// with the 0's, then assigns it to the start variable
// Takes the current time/date and assigns it to end 
export function currentMonthWindow(now = new Date()) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
  const end = now; // month-to-date, up to this moment
  return { start, end };
}
