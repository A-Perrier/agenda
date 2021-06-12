import React, { Component } from 'react';
import MonthNavigation from './MonthNavigation';
import Weekdays from './Weekdays';
import Weeks from './Weeks';
import { 
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
  lastDayOfNextMonth } from '../shared/utils';
import { LeftIcon, RightIcon } from '../shared/svg';
import Cache from '../services/Cache';




class Month extends Component {
  state = {
    monthNumber: actualMonth(),
    monthName: actualMonth('fullname'),
    year: actualYear(),
    daysInMonth: daysInMonth(actualMonth(), actualYear()),
    firstDayOfMonth: firstDayOfMonth(actualMonth(), actualYear()),
    lastDayOfMonth: lastDayOfMonth(actualMonth(), actualYear()),

    daysInPrevMonth: daysInPrevMonth(actualMonth(), actualYear()),
    firstDayOfPrevMonth: firstDayOfPrevMonth(actualMonth(), actualYear()),
    lastDayOfPrevMonth: lastDayOfPrevMonth(actualMonth(), actualYear()),

    daysInNextMonth: daysInNextMonth(actualMonth(), actualYear()),
    firstDayOfNextMonth: firstDayOfNextMonth(actualMonth(), actualYear()),
    lastDayOfNextMonth: lastDayOfNextMonth(actualMonth(), actualYear())
  };

  handlePrevMonth () {
    const { monthNumber } = this.state;
    monthNumber > 1 ? this.removeMonth() : this.removeYear()
  }

  handleNextMonth () {
    const { monthNumber } = this.state;
    monthNumber < 12 ? this.addMonth() : this.addYear()
  }

  addMonth () {
    Cache.erase()
    const { monthNumber, year } = this.state
    this.setState({ 
      monthNumber: monthNumber + 1, 
      monthName: formatMonth((monthNumber + 1), 'fullname'),
      daysInMonth: daysInMonth((monthNumber + 1), year),
      firstDayOfMonth: firstDayOfMonth((monthNumber + 1), year),  
      lastDayOfMonth: lastDayOfMonth((monthNumber + 1), year),

      daysInPrevMonth: daysInPrevMonth((monthNumber + 1), year),
      firstDayOfPrevMonth: firstDayOfPrevMonth((monthNumber + 1), year),
      lastDayOfPrevMonth: lastDayOfPrevMonth((monthNumber + 1), year),

      daysInNextMonth: daysInNextMonth((monthNumber + 1), year),
      firstDayOfNextMonth: firstDayOfNextMonth((monthNumber + 1), year),
      lastDayOfNextMonth: lastDayOfNextMonth((monthNumber + 1), year)
    })
  }

  removeMonth () {
    Cache.erase()
    const { monthNumber, year } = this.state
    this.setState({ 
      monthNumber: monthNumber - 1, 
      monthName: formatMonth((monthNumber - 1), 'fullname'),
      daysInMonth: daysInMonth((monthNumber - 1), year),
      firstDayOfMonth: firstDayOfMonth((monthNumber - 1), year),
      lastDayOfMonth: lastDayOfMonth((monthNumber - 1), year),

      daysInPrevMonth: daysInPrevMonth((monthNumber - 1), year),
      firstDayOfPrevMonth: firstDayOfPrevMonth((monthNumber - 1), year),
      lastDayOfPrevMonth: lastDayOfPrevMonth((monthNumber - 1), year),

      daysInNextMonth: daysInNextMonth((monthNumber - 1), year),
      firstDayOfNextMonth: firstDayOfNextMonth((monthNumber - 1), year),
      lastDayOfNextMonth: lastDayOfNextMonth((monthNumber - 1), year)
    })
  }

  addYear () {
    Cache.erase()
    const { year } = this.state;
    this.setState({ 
      year: year + 1, 
      monthNumber: 1, 
      monthName: formatMonth(1, 'fullname'),
      daysInMonth: 31, // Janvier
      firstDayOfMonth: firstDayOfMonth(1, year + 1),
      lastDayOfMonth: lastDayOfMonth(1, year + 1),

      daysInPrevMonth: daysInPrevMonth(1, year + 1),
      firstDayOfPrevMonth: firstDayOfPrevMonth(1, year + 1),
      lastDayOfPrevMonth: lastDayOfPrevMonth(1, year + 1),

      daysInNextMonth: daysInNextMonth(1, year + 1),
      firstDayOfNextMonth: firstDayOfNextMonth(1, year + 1),
      lastDayOfNextMonth: lastDayOfNextMonth(1, year + 1)
    })
  }

  removeYear () {
    Cache.erase()
    const { year } = this.state;
    this.setState({ 
      year: year - 1, 
      monthNumber: 12, 
      monthName: formatMonth(12, 'fullname'),
      daysInMonth: 31, // Décembre
      firstDayOfMonth: firstDayOfMonth(12, year - 1),
      lastDayOfMonth: lastDayOfMonth(12, year - 1),

      daysInPrevMonth: daysInPrevMonth(12, year - 1),
      firstDayOfPrevMonth: firstDayOfPrevMonth(12, year - 1),
      lastDayOfPrevMonth: lastDayOfPrevMonth(12, year - 1),

      daysInNextMonth: daysInNextMonth(12, year - 1),
      firstDayOfNextMonth: firstDayOfNextMonth(12, year - 1),
      lastDayOfNextMonth: lastDayOfNextMonth(12, year - 1)
    })
  }
  
  
  render () {
    const { monthName, year, daysInNextMonth, firstDayOfNextMonth, lastDayOfNextMonth } = this.state
    console.log('Nombre de jours du mois précédent : ' + daysInNextMonth)
    console.log('Premier jour du mois précédent: ' + firstDayOfNextMonth)
    console.log('Dernier jour du mois précédent: ' + lastDayOfNextMonth)
    return ( 
      <div className="month">
          
          <header>
            <h1>{monthName} {year}</h1>
            <MonthNavigation>
              <LeftIcon onClick={(e) => this.handlePrevMonth(e)} />
              <RightIcon onClick={(e) => this.handleNextMonth(e)} />
            </MonthNavigation>
          </header>
  
          <Weekdays />
          <Weeks />
        </div>
     );
  }
}
 
export default Month;