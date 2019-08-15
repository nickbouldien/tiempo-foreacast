export const apiUrl: string = `http://api.openweathermap.org/data/2.5/`;

export const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

export function dayOfWeekAsString(dayIndex: number): string {
  return days[dayIndex];
}
