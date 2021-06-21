import React, { useContext, useEffect, useState } from 'react';
import { indexOfMonth, actualMonth, actualYear, formatMonth } from '../../shared/utils';
import DayEventBox from './DayEventBox';
import { DaySelectedContext } from '../Agenda'
import { DateEventsContext } from '../Agenda'

const Day = ({ 
  children, 
  className,
  monthName,
  year }) => {

  const { daySelected, setDaySelected } = useContext(DaySelectedContext)
  const { dateEvents, setDateEvents } = useContext(DateEventsContext)

  const [YPos, setYPos] = useState(null)
  const [divInfo, setDivInfo] = useState('')
  const [dropColors, setDropColors] = useState([])
  const [currentDateEvents, setCurrentDateEvents] = useState([])

  const isPrevMonth = className.includes('prev-month')
  const isNextMonth = className.includes('next-month')
  const viewMonthNameIndex = indexOfMonth(monthName) // L'index du mois de l'affichage
  let targetMonthIndex = viewMonthNameIndex // L'index du mois qui prend en compte les mois précédents et suivants
  let targetYear = year // L'année, prennant en compte les mois précédents et suivants

  function setTargetMonthIndex () {
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
  const numericDate = `${children}-${formatMonth(targetMonthIndex, 'digit')}-${targetYear}` 

  // On récupère la date du jour pour lui donner une class CSS spéciale
  if (
      (new Date()).getDate() === children &&
      actualYear() === year &&
      actualMonth('fullname') === monthName
    ) 
  className += ' today';


  useEffect(() => {
    // A partir de la liste de tous les dateEvents, on trie pour récupérer ceux qui concernent le jour courant
    const events = [] 
    dateEvents.map(dateEvent => {
      dateEvent.date === numericDate && events.push(dateEvent)
    })
    setCurrentDateEvents(events)

    // Puis on set les dropColors
    events.map(event => {
      if (!dropColors.includes(event.category.color)) dropColors.push(event.category.color)
    })
  }, [dateEvents])


  function makeSelection (el) {
    const selected = document.querySelector('.day.selected')
    if (selected) selected.classList.remove('selected')
    el.classList.add('selected')
  }

  function handleClick (e) {
    makeSelection(e.currentTarget)
    setDivInfo(e.currentTarget)
    e.currentTarget.classList.add('event-box-opened')

    if (e.currentTarget !== daySelected) {
      setDaySelected(e.currentTarget)
      setYPos(e.clientY)
    }
  }

  function onEventCreate (eventColor) {
    const copy = dropColors.slice()
    if (!copy.includes(eventColor)) {
      copy.push(eventColor)
      setDropColors(copy)
    }
  }
  
  return (
    <>
    <div className={className} onClick={(e) => handleClick(e)}>
      { children }
      <div className="drops">
        {
          dropColors.map(dropColor =>
            <div key={dropColor} className="drop" style={{backgroundColor: dropColor}}></div>
          )
        }
      </div>
    </div>
    { divInfo === daySelected && 
      <DayEventBox key={numericDate} fullDate={fullDate} numericDate={numericDate} YPos={YPos} onEventCreate={onEventCreate} events={currentDateEvents} />
      }
    </>
   );
}
 
export default Day;