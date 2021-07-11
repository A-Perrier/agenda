import React from 'react';
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

const days = {
  "Lundi": {
    index: 1,
    abbr: "LU"
  },
  "Mardi": {
    index: 2,
    abbr: "MA"
  },
  "Mercredi": {
    index: 3,
    abbr: "ME"
  },
  "Jeudi": {
    index: 4,
    abbr: "JE"
  },
  "Vendredi": {
    index: 5,
    abbr: "VE"
  },
  "Samedi": {
    index: 6,
    abbr: "SA"
  },
  "Dimanche": {
    index: 7,
    abbr: "DI"
  },
}


function getFormattedDate (dateTime, separator = '-') {
  let date = dateTime.toLocaleDateString()
  return date.replace(/\//g, separator)
}


/**
 * From a month name, returns the index of it based on the month list
 * @param {String} monthName 
 */
const indexOfMonth = (monthName) => {
  let index
  Object.entries(months)
        .find(([key, monthObject]) => {
          if (monthObject.fullname === monthName) index = key
        }
  )

  return +index
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
    Cache.set('currentMonth', currentMonth)
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

const actualDate = (suitableDateTime = false) => {
  return !suitableDateTime ? 
    `${new Date().getDate()}-${actualMonth('digit')}-${actualYear()}` :
    `${actualYear()}-${actualMonth('digit')}-${new Date().getDate()}`
}

/**
 * Format a number between 1 and 12 to return the desired equivalent
 * If type === null, returns only the Integer corresponding to the month
 * @param {Integer} monthNumber 
 * @param {String|null} type 'digit' || 'abbr' || 'fullname' 
 */
const formatMonth = (monthNumber, type = null) => {
  if (!+monthNumber || +monthNumber < 1 || +monthNumber > 12) 
    throw new Error(`formatMonth attend en premier paramètre un entier de 1 à 12`)
  if (type && (type !== 'digit' && type !== 'fullname' && type !== 'abbr')) 
    throw new Error(`formatMonth attend en paramètre "digit", "abbr" ou "fullname"`)

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
  const firstDay = new Date(+year, +monthNumber - 1, 1).toLocaleDateString('fr-FR', { weekday: 'long' })
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


/**
 * Converts a french formatted date to a DateTime object
 * @param {String} date formatted like "27-04-2021" 
 * @param {String} time formatted like "11:30" 
 */
function frFormatToDateTime (date, time = null, toTimeStamp = false) {
  const exploded = date.split('-');
  const day = exploded[0];
  const month = exploded[1];
  const year = exploded[2];
  const getTime = time ? `T${time}:00` : ''

  return toTimeStamp ? 
    new Date(`${year}-${month}-${day}${getTime}`).getTime() : 
    new Date(`${year}-${month}-${day}${getTime}`);
}


/**
 * Evaluates the duration in days, hours and minutes between two dates
 * @param {Integer|Date} limitDate Takes timestamp or Date object
 * @param {Integer|Date} fromWhen Takes timestamp or Date object
 * @returns {Object} {days: int, hours: int, minutes: int, isPassed: bool}
 */
function getTimeUntil (limitDate, fromWhen = new Date()) {
  const minutesUntil = (limitDate - fromWhen) / 1000 / 60
  const isPassed = limitDate < fromWhen

  return {
    ... calculateTimeFromMinutes(minutesUntil),
    isPassed
  }
}



function calculateTimeFromMinutes (minutes) {
  let hours = 0
  let days = 0

  while (minutes >= 60) {
    minutes -= 60
    hours += 1
  }

  while (hours >= 24) {
    hours -= 24
    days += 1
  }

  return { 
    days: Math.round(days), 
    hours: Math.round(hours), 
    minutes: Math.round(minutes)
  }
}


const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const errorMessage = message => 
  <p className="form-error">
    <span className="form-badge">ERROR</span>
    { message }
  </p>

/**
 * Makes a copy of the original array, remove Item in parameter from it, then returns the copy
 * @param {Array} array 
 * @param {Object} item 
 */
const removeFromArray = (array, item) => {
  const copy = array.slice()
  const index = copy.indexOf(item)
  index !== -1 && copy.splice(index, 1)
  return copy;
}

const getSelected = (selector, innerText) => {
  return Array.from(document.querySelectorAll(selector))
              .find(el => el.textContent === innerText);
}

export {
  months,
  days,
  getFormattedDate,
  indexOfMonth,
  actualMonth,
  actualYear,
  actualDate,
  formatMonth,
  daysInMonth,
  daysInPrevMonth,
  daysInNextMonth,
  firstDayOfMonth,
  firstDayOfPrevMonth,
  firstDayOfNextMonth,
  lastDayOfMonth,
  lastDayOfPrevMonth,
  lastDayOfNextMonth,
  errorMessage,
  removeFromArray,
  getSelected,
  getTimeUntil,
  frFormatToDateTime
}