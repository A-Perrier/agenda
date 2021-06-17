import React, { useState } from 'react';
import { actualMonth, actualYear } from '../../shared/utils';

const Day = ({ 
  children, 
  className,
  monthName,
  year }) => {
    
  if (
      (new Date()).getDate() === children &&
      actualYear() === year &&
      actualMonth('fullname') === monthName
    ) 
  className += ' today'

  const removeSelection = () => {
    const selected = document.querySelector('.day.selected')
    if (selected) selected.classList.remove('selected')
  }

  const handleSelection = (el) => {
    removeSelection()
    el.classList.add('selected')
  }

  const isPrevMonth = className.includes('prev-month')
  const isNextMonth = className.includes('next-month')

  const handleClick = (e) => handleSelection(e.currentTarget)

  return ( 
    <div className={className} onClick={(e) => handleClick(e)}>
      { children }
    </div>
   );
}
 
export default Day;