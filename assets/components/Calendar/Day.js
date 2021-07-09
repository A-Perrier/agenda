import React, { useContext, useEffect, useState } from 'react';
import { indexOfMonth, actualMonth, actualYear, formatMonth } from '../../shared/utils';
import DayEventBox from '../AgendaEvents/DayEventBox';
import { DaySelectedContext } from '../Agenda'
//import { DateEventsContext } from '../Agenda'
import { connect } from 'react-redux';

const Day = ({ 
  dayInt, 
  className,
  monthName,
  year,
  events // from redux store
}) => {

  const { daySelected, setDaySelected } = useContext(DaySelectedContext)

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

  const fullDate = `${dayInt} ${formatMonth(targetMonthIndex, 'fullname')} ${targetYear}`
  const numericDate = `${dayInt}-${formatMonth(targetMonthIndex, 'digit')}-${targetYear}` 

  // On récupère la date du jour pour lui donner une class CSS spéciale
  if (
      (new Date()).getDate() === dayInt &&
      actualYear() === year &&
      actualMonth('fullname') === monthName &&
      !className.includes('day__next-month') &&
      !className.includes('day__prev-month')
    ) 
  className += ' today';


  useEffect(() => {
    // Si on place cette ligne ici, les jours se vident avec une latence
    dropColors.splice(0, dropColors.length)

    const eventsThisDay = [] 
    events.map(event => {
      event.date === numericDate && eventsThisDay.push(event)
    })
    setCurrentDateEvents(eventsThisDay)

    // Puis on set les dropColors
    eventsThisDay.map(event => {
      if (!dropColors.includes(event.category.color)) dropColors.push(event.category.color)
    })
  }, [events])


  function makeSelection (el) {
    const selected = document.querySelector('.day.selected')
    if (selected) selected.classList.remove('selected')
    el.classList.add('selected')
  }

  function handleClick (e) {
    makeSelection(e.currentTarget)
    setDivInfo(e.currentTarget)
    e.currentTarget.classList.add('event-box-opened')

    // On ne relance ce bloc que s'il y a un changement de sélection dans le jour choisi
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

  function afterEventDeleted (events) {
    setCurrentDateEvents(events)
    dropColors.splice(0, dropColors.length)
    events.map(event => {
      if (!dropColors.includes(event.category.color)) dropColors.push(event.category.color)
    })
  }
  
  function removeBox () {
    setDivInfo('')
    const boxOpened = document.querySelector('.day.selected.event-box-opened')
    if (boxOpened) boxOpened.classList.remove('event-box-opened')
  }

  return (
    <>
    <div className={className} onClick={(e) => handleClick(e)} >
      { dayInt }
      <div className="drops">
        {
          dropColors.map(dropColor =>
            <div key={dropColor} className="drop" style={{backgroundColor: dropColor}}></div>
          )
        }
      </div>
    </div>
    { divInfo === daySelected && 
      <DayEventBox removeBox={removeBox} key={numericDate} fullDate={fullDate} numericDate={numericDate} YPos={YPos} onEventCreate={onEventCreate} events={currentDateEvents} afterEventDeleted={afterEventDeleted}/>
      }
    </>
   );
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(Day);