import React from 'react';
import Week from './Week';
import { days } from '../shared/utils';

const Weeks = ({ 
  daysInMonth, 
  daysInPrevMonth, 
  firstDayOfMonth, 
  monthName,
  goToPrevMonth,
  goToPrevYear,
  goToNextMonth, 
  goToNextYear }) => {

  const weeks = [];
  for (let i = 0; i < 6; i++) {
    let start;
    let end;
    let daysRemainingInMonth = daysInMonth;

    if (i === 0) {
      // Si c'est la première semaine
      const firstDayPosition = days[firstDayOfMonth].index;
      const daysToFill = firstDayPosition - 1;
      start = daysInPrevMonth + 1 - daysToFill;
      end = 7 - daysToFill;
      daysRemainingInMonth -= end
      weeks.push(<Week 
        key={'week' + i} 
        start={start} 
        end={end} 
        monthName={monthName} 
        daysInPrevMonth={daysInPrevMonth} 
        daysInMonth={null}
        goToPrevMonth={goToPrevMonth}
        goToPrevYear={goToPrevYear}
         />);

    } else if (i > 0 && i < 6) {
      // Pour les autres semaines que la première
      const lastEnd = weeks[weeks.length - 1].props.end
      start = lastEnd + 1

      if (daysRemainingInMonth - lastEnd <= 7) {
        end = 7 - daysRemainingInMonth + lastEnd
        daysRemainingInMonth = 0
      } else {
        end = start + 6
        daysRemainingInMonth -= end
      }

      // Si la dernière semaine n'a QUE des jours trop bas pour faire partie de ce mois-ci
      if (i >= 5 && start < 20 && end < 20) {
        weeks.push(<Week 
          key={'week' + i} 
          start={start} 
          end={end} 
          monthName={monthName} 
          daysInPrevMonth={null} 
          daysInMonth={daysInMonth} 
          isNextMonth={true}
          goToNextMonth={goToNextMonth} 
          goToNextYear={goToNextYear}
          />);
      } else {
        weeks.push(<Week 
          key={'week' + i} 
          start={start} 
          end={end} 
          monthName={monthName} 
          daysInPrevMonth={null} 
          daysInMonth={daysInMonth}
          goToNextMonth={goToNextMonth} 
          goToNextYear={goToNextYear}
          />);
      }
      
    }
  }

  return (
    <>
    {weeks}
    </>
   );
}
 
export default Weeks;