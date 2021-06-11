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
 * Returns the actual month at this moment
 * @param {String} type 'digit' || 'abbr' || 'fullname' 
 */
const getActualMonth = (type) => {
  const currentMonth = (new Date()).getMonth() + 1
  return formatMonth(currentMonth, type)
}

const getActualYear = () => (new Date()).getFullYear()

/**
 * Format a number between 1 and 12 to return the desired equivalent
 * @param {Integer} monthNumber 
 * @param {String|null} type 'digit' || 'abbr' || 'fullname' 
 */
const formatMonth = (monthNumber, type = null) => {
  if (!+monthNumber || +monthNumber < 1 || +monthNumber > 12) throw new Error(`formatMonth attend en premier paramètre un entier de 1 à 12`)
  if (type && (type !== 'digit' && type !== 'fullname' && type !== 'abbr')) throw new Error(`formatMonth attend en paramètre "digit", "abbr" ou "fullname"`)

  return type !== null ? months[+monthNumber][type] : monthNumber
}

export {
  months,
  getActualMonth,
  getActualYear,
  formatMonth
}