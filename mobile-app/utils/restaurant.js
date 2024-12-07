export const isRestaurantOpen = (businessHours) => {
  // if (!businessHours) {
  //   return null;
  // }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = daysOfWeek[new Date().getDay()];
  const currentTime = new Date();
  // Find the hours for the current day
  const todayHours = businessHours.find((hours) => hours.day === currentDay);

  if (!todayHours) return false;

  const { startTime, endTime } = todayHours.openHours;

  // Parse start and end times
  const [startHour, startMinute] = startTime.match(/\d+/g);
  const startPeriod = startTime.includes("PM") && startHour !== "12" ? 12 : 0;
  const start = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    parseInt(startHour) + startPeriod,
    parseInt(startMinute)
  );

  const [endHour, endMinute] = endTime.match(/\d+/g);
  const endPeriod = endTime.includes("PM") && endHour !== "12" ? 12 : 0;
  const end = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    parseInt(endHour) + endPeriod,
    parseInt(endMinute)
  );

  // Check if current time is within the start and end times
  return currentTime >= start && currentTime <= end;
};
