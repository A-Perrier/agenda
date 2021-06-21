import React from 'react';
import Month from './Month';

const Calendar = ({ onMonthChange }) => {
  return ( 
    <div className="calendar" >
      <Month onMonthChange={onMonthChange} />
    </div>
   );
}
 
export default Calendar;