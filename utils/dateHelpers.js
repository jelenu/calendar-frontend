export function setTimeToZero(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function formatDateTime(date) {
  return date ? new Date(date).toISOString() : "";
}

export function formatDate(date) {
  if (!date || isNaN(date.getTime())) return "Select date";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function formatTime(date) {
  if (!date || isNaN(date.getTime())) return "No time";
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function getFormattedMonth(date) {
  const formatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  });
  const formatted = formatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}