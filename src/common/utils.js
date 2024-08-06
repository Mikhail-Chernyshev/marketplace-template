export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options).replace(',', '');
}
export function formatDateFrom(milliseconds) {
  const date = new Date(milliseconds);
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
