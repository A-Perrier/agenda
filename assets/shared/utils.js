import Cache from '../services/Cache';

const months = {
  1: {
    digit: '01',
    abbr: 'Jan',
    fullname: 'Janvier'
  },
  2: {
    digit: '02',
    abbr: 'Fev',
    fullname: 'Février'
  },
  3: {
    digit: '03',
    abbr: 'Mar',
    fullname: 'Mars'
  },
  4: {
    digit: '04',
    abbr: 'Avr',
    fullname: 'Avril'
  },
  5: {
    digit: '05',
    abbr: 'Mai',
    fullname: 'Mai'
  },
  6: {
    digit: '06',
    abbr: 'Juin',
    fullname: 'Juin'
  },
  7: {
    digit: '07',
    abbr: 'Juil',
    fullname: 'Juillet'
  },
  8: {
    digit: '08',
    abbr: 'Aoû',
    fullname: 'Août'
  },
  9: {
    digit: '09',
    abbr: 'Sep',
    fullname: 'Septembre'
  },
  10: {
    digit: '10',
    abbr: 'Oct',
    fullname: 'Octobre'
  },
  11: {
    digit: '11',
    abbr: 'Nov',
    fullname: 'Novembre'
  },
  12: {
    digit: '12',
    abbr: 'Dec',
    fullname: 'Décembre'
  }
}

/**
 * Returns the actual month at this moment.
 * If type === null, returns only the Integer corresponding to the month
 * @param {String|null} type 'digit' || 'abbr' || 'fullname' 
 */
const actualMonth = (type = null) => {
  let currentMonth = Cache.get('currentMonth')
  
  if (currentMonth === null) {
    currentMonth = (new Date()).getMonth() + 1;
    Cache.set('currentMonth', currentMonth);
  }
 
  return type !== null ? formatMonth(currentMonth, type) : currentMonth
}

const actualYear = () => {
  let currentYear = Cache.get('currentYear')

  if (currentYear === null) {
    currentYear = (new Date()).getFullYear()
  }
  
  return currentYear
}

/**
 * Format a number between 1 and 12 to return the desired equivalent
 * If type === null, returns only the Integer corresponding to the month
 * @param {Integer} monthNumber 
 * @param {String|null} type 'digit' || 'abbr' || 'fullname' 
 */
const formatMonth = (monthNumber, type = null) => {
  if (!+monthNumber || +monthNumber < 1 || +monthNumber > 12) 
    throw new Error(`formatMonth attend en premier paramètre un entier de 1 à 12`);
  if (type && (type !== 'digit' && type !== 'fullname' && type !== 'abbr')) 
    throw new Error(`formatMonth attend en paramètre "digit", "abbr" ou "fullname"`);

  return type !== null ? months[+monthNumber][type] : monthNumber
}

/**
 * Returns the number of days contained in the given month of the given year
 * @param {Integer|String} monthNumber 
 * @param {Integer|String} year 
 */
const daysInMonth = (monthNumber, year) => {
  return (new Date(+year, +monthNumber, 0)).getDate()
}

const daysInPrevMonth = (monthNumber, year) => {
  return monthNumber === 1 ? daysInMonth(12, year - 1) : daysInMonth(monthNumber - 1, year)
}

const daysInNextMonth = (monthNumber, year) => {
  return monthNumber === 12 ? daysInMonth(1, year + 1) : daysInMonth(monthNumber + 1, year)
}


const firstDayOfMonth = (monthNumber, year) => {
  // We need to say monthNumber - 1 because Date constructor is searching for month index, which is starting from 0
  const firstDay = new Date(+year, +monthNumber - 1, 1).toLocaleDateString('fr-FR', { weekday: 'long' });
  return capitalize(firstDay);
}

const firstDayOfPrevMonth = (monthNumber, year) => {
  return monthNumber === 1 ? firstDayOfMonth(12, year - 1) : firstDayOfMonth(monthNumber - 1, year)
}

const firstDayOfNextMonth = (monthNumber, year) => {
  return monthNumber === 12 ? firstDayOfMonth(1, year + 1) : firstDayOfMonth(monthNumber + 1, year)
}

const lastDayOfMonth = (monthNumber, year) => {
  // We keep monthNumber here, because 0 parameter will check the previous day of the first one of the current monthIndex.
  // Our monthNumber is equal to monthIndex + 1, so we don't need to look to the next index
  const lastDay = new Date(+year, +monthNumber, 0).toLocaleDateString('fr-FR', { weekday: 'long' });
  
  return capitalize(lastDay);
}

const lastDayOfPrevMonth = (monthNumber, year) => {
  return monthNumber === 1 ? lastDayOfMonth(12, year - 1) : lastDayOfMonth(monthNumber - 1, year)
}

const lastDayOfNextMonth = (monthNumber, year) => {
  return monthNumber === 12 ? lastDayOfMonth(1, year + 1) : lastDayOfMonth(monthNumber + 1, year)
}


const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export {
  months,
  actualMonth,
  actualYear,
  formatMonth,
  daysInMonth,
  daysInPrevMonth,
  daysInNextMonth,
  firstDayOfMonth,
  firstDayOfPrevMonth,
  firstDayOfNextMonth,
  lastDayOfMonth,
  lastDayOfPrevMonth,
  lastDayOfNextMonth
}