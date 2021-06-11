import React, { Component } from 'react';
import MonthNavigation from './MonthNavigation';
import Weekdays from './Weekdays';
import Weeks from './Weeks';
import { 
  months,
  getActualMonth,
  getActualYear,
  formatMonth } from '../shared/utils';
import { LeftIcon, RightIcon } from '../shared/svg';


class Month extends Component {
  state = {
    monthNumber: getActualMonth(),
    monthName: getActualMonth('fullname'),
    year: getActualYear(),
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
    this.setState({ 
      monthNumber: this.state.monthNumber + 1, 
      monthName: formatMonth((this.state.monthNumber + 1), 'fullname') 
    })
  }

  removeMonth () {
    this.setState({ 
      monthNumber: this.state.monthNumber - 1, 
      monthName: formatMonth((this.state.monthNumber - 1), 'fullname') 
    })
  }

  addYear () {
    const { year, monthNumber, monthName } = this.state;
    this.setState({ year: year + 1, monthNumber: 1, monthName: formatMonth(1, 'fullname') })
  }

  removeYear () {
    const { year, monthNumber, monthName } = this.state;
    this.setState({ year: year - 1, monthNumber: 12, monthName: formatMonth(12, 'fullname') })
  }
  
  
  render () {
    const { monthName, year } = this.state

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