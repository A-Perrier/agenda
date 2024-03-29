import React from 'react';
import Week from './Week';
import { days } from '../../shared/utils';

const Weeks = ({ 
  daysInMonth, 
  daysInPrevMonth, 
  firstDayOfMonth, 
  monthName,
  year }) => {

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
        year={year}
        daysInPrevMonth={daysInPrevMonth} 
        daysInMonth={null}
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

      // Si les deux dernières semaines n'ont QUE des jours trop bas pour faire partie de ce mois-ci
      if (i >= 4 && start < 20 && end < 20) {
        weeks.push(<Week 
          key={'week' + i} 
          start={start} 
          end={end} 
          monthName={monthName} 
          year={year}
          daysInPrevMonth={null} 
          daysInMonth={daysInMonth} 
          isNextMonth={true}
          />);
      } else {
        weeks.push(<Week 
          key={'week' + i} 
          start={start} 
          end={end} 
          monthName={monthName} 
          year={year}
          daysInPrevMonth={null} 
          daysInMonth={daysInMonth}
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