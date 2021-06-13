import React from 'react';

const Day = ({ 
  children, 
  className, 
  goToPrevMonth,
  goToPrevYear,
  goToNextMonth, 
  goToNextYear, 
  monthName }) => {

  const isPrevMonth = className.includes('prev-month')
  const isNextMonth = className.includes('next-month')

  const actionToUse = () => {
    if (!isPrevMonth && !isNextMonth) return;

    if (isPrevMonth) return monthName === 'Janvier' ? goToPrevYear : goToPrevMonth;
    if (isNextMonth) return monthName === 'Décembre' ? goToNextYear : goToNextMonth;
  }

  return ( 
    <div className={className} onClick={actionToUse()}>
      { children }
    </div>
   );
}
 
export default Day;