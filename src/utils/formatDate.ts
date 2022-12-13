import declOfNum from './declOfNum';

const months = [
  'January',
  'February',
  'Martha',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function decomposeDate(date: number | Date | string) {
  date = new Date(date).getTime();
  if (typeof date === 'string') {
    date = Number(date);
  }
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const hours = new Date(date).getHours();
  const min = new Date(date).getMinutes();
  return { date, year, month, day, hours, min };
}

export function getDateDDMMYYYY(date: number | Date | string) {
  const { day, month, year } = decomposeDate(date);
  return `${day} ${months[month]} ${year}`;
}


export default function formatDate(value: number | Date | string) {
  value = new Date(value).getTime();
  const { year, month, day, hours, min } = decomposeDate(value);
  const currentDateTime = Date.now();
  const postCreatedTime = Number(value);
  const diffTime = Math.abs(currentDateTime - postCreatedTime);
  const {day:currentDay} = decomposeDate(currentDateTime);
  
  const checkLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getValidTime = (hours: number | string, min: number | string) => {
    hours = hours < 10 ? `0${hours}` : hours;
    min = min < 10 ? `0${min}` : min;
    return `${hours}:${min}`;
  };

  const oneMinutesAgo = 60000;
  const thirtyMinutesAgo = oneMinutesAgo * 30;
  const lessOneDay = oneMinutesAgo * 60 * 24;
  const lessCurrentYear = lessOneDay * (checkLeapYear(year) ? 366 : 365);
  
  if (diffTime <= oneMinutesAgo) {
    return 'just now';
  } 
  else if (diffTime <= thirtyMinutesAgo) {
    const minutes = Math.floor(diffTime / 60000);
    return `${minutes} ${declOfNum(minutes, ['minute', 'minutes', 'minutes'])} ago`;
  } 
  else if (diffTime > thirtyMinutesAgo && day===currentDay) {
    return `Today at ${getValidTime(hours, min)}`;
  } 
  else if (day!==currentDay && diffTime <= lessCurrentYear) {
    return `${day} ${months[month]} in ${getValidTime(hours, min)}`;
  } 
  else if (diffTime > lessCurrentYear) {
    return `${day} ${months[month]} ${year} years in ${getValidTime(hours, min)}`;
  } 
  else {
    return `This comment was made by a UFO from the future ¯\\_(ツ)_/¯`;
  }
}
