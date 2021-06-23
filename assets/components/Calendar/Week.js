import React from 'react';
import Day from './Day';

const Week = ({ 
  start, 
  end, 
  daysInPrevMonth, 
  daysInMonth, 
  isNextMonth, 
  monthName,
  year }) => {

  const days = [];

  const setFirstWeek = () => {
    const daysBeforeStartingMonth = daysInPrevMonth - start + 1
    for (let j = 0; j < daysBeforeStartingMonth; j++) {
      days.push(
      <Day 
        key={`day-${j}`} 
        dayInt={daysInPrevMonth - daysBeforeStartingMonth + 1 + j}
        monthName={monthName} 
        year={year}
        className="day day__prev-month"
        />)
    }

    let dayInt = 1;
    while (days.length < 7) {
      let k = days.length;
      days.push(
      <Day 
        key={`day-${k}`} 
        dayInt={dayInt}
        monthName={monthName} 
        year={year}
        className="day"
        />)

      k++;
      dayInt++;
    }
  }

  const setNotFirstWeek = () => {
    let newMonthBeginning = 1

    for (let i = 0; i < 7; i++) {
      let dayInt = start + i

      // Si le compteur de jour dépasse le nombre de jours contenus dans le mois on réinitialise
      if (dayInt > daysInMonth) {
        dayInt = newMonthBeginning
        newMonthBeginning++
        days.push(
        <Day 
          key={`day-${i}`} 
          dayInt={dayInt}
          monthName={monthName} 
          year={year}
          className="day day__next-month"
          />)
      } else {
        // Si la semaine entière provient du mois suivant on donne aux jours une classe correspondante
        if (isNextMonth) {
          days.push(
          <Day 
            key={`day-${i}`} 
            dayInt={dayInt}
            monthName={monthName} 
            year={year}
            className="day day__next-month"
            />)

        // Sinon on l'insère comme une semaine normale
        } else {
          days.push(
          <Day 
            key={`day-${i}`} 
            dayInt={dayInt}
            monthName={monthName} 
            year={year}
            className="day"
            />)
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