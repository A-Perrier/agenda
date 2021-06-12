import React, { Component } from 'react';
import MonthNavigation from './MonthNavigation';
import Weekdays from './Weekdays';
import Weeks from './Weeks';
import { 
  getActualMonth,
  getActualYear,
  formatMonth,
  daysInMonth } from '../shared/utils';
import { LeftIcon, RightIcon } from '../shared/svg';


class Month extends Component {
  state = {
    monthNumber: getActualMonth(),
    monthName: getActualMonth('fullname'),
    year: getActualYear(),
    daysInMonth: null
  };

  componentDidMount () {
    this.setState({ daysInMonth: daysInMonth(this.state.monthNumber, this.state.year) })
  }

  handlePrevMonth () {
    const { monthNumber } = this.state;
    monthNumber > 1 ? this.removeMonth() : this.removeYear()
  }

  handleNextMonth () {
    const { monthNumber } = this.state;
    monthNumber < 12 ? this.addMonth() : this.addYear()
  }

  addMonth () {
    const { monthNumber, year } = this.state
    this.setState({ 
      monthNumber: monthNumber + 1, 
      monthName: formatMonth((monthNumber + 1), 'fullname'),
      daysInMonth: daysInMonth((monthNumber + 1), year)  
    })
  }

  removeMonth () {
    const { monthNumber, year } = this.state
    this.setState({ 
      monthNumber: monthNumber - 1, 
      monthName: formatMonth((monthNumber - 1), 'fullname'),
      daysInMonth: daysInMonth((monthNumber - 1), year)
    })
  }

  addYear () {
    const { year, monthNumber, monthName } = this.state;
    this.setState({ 
      year: year + 1, 
      monthNumber: 1, 
      monthName: formatMonth(1, 'fullname'),
      daysInMonth: 31 // Janvier
    })
  }

  removeYear () {
    const { year, monthNumber, monthName } = this.state;
    this.setState({ 
      year: year - 1, 
      monthNumber: 12, 
      monthName: formatMonth(12, 'fullname'),
      daysInMonth: 31 // Décembre
    })
  }
  
  
  render () {
    const { monthName, year, daysInMonth } = this.state
    
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