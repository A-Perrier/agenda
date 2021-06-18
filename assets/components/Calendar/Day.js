import React, { useContext, useState } from 'react';
import { indexOfMonth, actualMonth, actualYear, formatMonth } from '../../shared/utils';
import DayEventBox from './DayEventBox';
import { DaySelectedContext } from '../Agenda'

const Day = ({ 
  children, 
  className,
  monthName,
  year }) => {

  const { daySelected, setDaySelected } = useContext(DaySelectedContext)
  const [YPos, setYPos] = useState(null)
  const [divInfo, setDivInfo] = useState('')

  const isPrevMonth = className.includes('prev-month')
  const isNextMonth = className.includes('next-month')
  const viewMonthNameIndex = indexOfMonth(monthName) // L'index du mois de l'affichage
  let targetMonthIndex = viewMonthNameIndex // L'index du mois qui prend en compte les mois précédents et suivants
  let targetYear = year // L'année, prennant en compte les mois précédents et suivants

  const setTargetMonthIndex = () => {
    if (isPrevMonth) {
      if (viewMonthNameIndex === 1) {
        targetMonthIndex = 12
        targetYear -= 1
        return
      } else {
        targetMonthIndex -= 1
      }
    } else if (isNextMonth) {
      if (viewMonthNameIndex === 12) {
        targetMonthIndex = 1
        targetYear += 1
      } else {
        targetMonthIndex += 1
      }
    }
  }
  setTargetMonthIndex()

  const fullDate = `${children} ${formatMonth(targetMonthIndex, 'fullname')} ${targetYear}`
  const numericDate = `${children}/${formatMonth(targetMonthIndex, 'digit')}/${targetYear}` 

  // On récupère la date du jour pour lui donner une class CSS spéciale
  if (
      (new Date()).getDate() === children &&
      actualYear() === year &&
      actualMonth('fullname') === monthName
    ) 
  className += ' today';

  const makeSelection = (el) => {
    const selected = document.querySelector('.day.selected')
    if (selected) selected.classList.remove('selected')
    el.classList.add('selected')
  }

  const handleClick = (e) => {
    makeSelection(e.currentTarget)
    setDivInfo(e.currentTarget)
    e.currentTarget.classList.add('event-box-opened')

    if (e.currentTarget !== daySelected) {
      setDaySelected(e.currentTarget)
      setYPos(e.clientY)
    }
  }

  return (
    <>
    <div className={className} onClick={(e) => handleClick(e)}>
      { children }
    </div>
    { divInfo === daySelected && 
      <DayEventBox key={numericDate} fullDate={fullDate} numericDate={numericDate} YPos={YPos}/>
      }
    </>
   );
}
 
export default Day;