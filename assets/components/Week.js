import React from 'react';
import Day from './Day';

const Week = ({ 
  start, 
  end, 
  daysInPrevMonth, 
  daysInMonth, 
  isNextMonth, 
  goToPrevMonth,
  goToPrevYear,
  goToNextMonth,
  goToNextYear,
  monthName }) => {

  const days = [];

  const setFirstWeek = () => {
    const daysBeforeStartingMonth = daysInPrevMonth - start + 1
    for (let j = 0; j < daysBeforeStartingMonth; j++) {
      days.push(
      <Day 
        key={`day-${j}`} 
        monthName={monthName} 
        className="day day__prev-month"
        goToPrevMonth={goToPrevMonth}
        goToPrevYear={goToPrevYear}
        >
        {daysInPrevMonth - daysBeforeStartingMonth + 1 + j}
      </Day>)
    }

    let children = 1;
    while (days.length < 7) {
      let k = days.length;
      days.push(
      <Day 
        key={`day-${k}`} 
        monthName={monthName} 
        className="day"
        >
        {children}
      </Day>)

      k++;
      children++;
    }
  }

  const setNotFirstWeek = () => {
    let newMonthBeginning = 1

    for (let i = 0; i < 7; i++) {
      let children = start + i

      // Si le compteur de jour dépasse le nombre de jours contenus dans le mois on réinitialise
      if (children > daysInMonth) {
        children = newMonthBeginning
        newMonthBeginning++
        days.push(
        <Day 
          key={`day-${i}`} 
          monthName={monthName} 
          className="day day__next-month" 
          goToNextMonth={goToNextMonth}
          goToNextYear={goToNextYear}
          >
          {children}
        </Day>)
      } else {
        // Si la semaine entière provient du mois suivant on donne aux jours une classe correspondante
        if (isNextMonth) {
          days.push(
          <Day 
            key={`day-${i}`} 
            monthName={monthName} 
            className="day day__next-month" 
            goToNextMonth={goToNextMonth}
            goToNextYear={goToNextYear}
            >
            {children}
          </Day>)

        // Sinon on l'insère comme une semaine normale
        } else {
          days.push(
          <Day 
            key={`day-${i}`} 
            monthName={monthName} 
            className="day">{children}
          </Day>)
        }
      }
    }
  }

  if (daysInPrevMonth) {
    setFirstWeek()
  }

  if (daysInMonth) {
    setNotFirstWeek()
  }
    

  return ( 
  <div className="week">
    { days }
  </div> );
}
 
export default Week;