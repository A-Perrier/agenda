import React, { createRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Agenda.scss';
import '../bootstrap';
import Calendar from './Calendar/Calendar';
import Categories from './Categories/Categories';
import { findAll } from '../services/Api/Events'



export const DaySelectedContext = React.createContext({
  daySelected: null, setDaySelected: () => {}
})

export const DateEventsContext = React.createContext({
  dateEvents: [], setDateEvents: () => {}
})


const Agenda = () => {
  const [daySelected, setDaySelected] = useState(null)
  const [dateEvents, setDateEvents] = useState([])
  const value = { daySelected, setDaySelected }
  const events = { dateEvents, setDateEvents }

  async function fetchEvents () {
    const events = await findAll()
    setDateEvents(events)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <DateEventsContext.Provider value={events}>
      <DaySelectedContext.Provider value={value}>
        <div className="agenda-container">
          <Calendar onMonthChange={fetchEvents} />
          <Categories maxCategoryLength="40" />
        </div>
      </DaySelectedContext.Provider>
    </DateEventsContext.Provider>
  )
}

const agenda = document.querySelector('#agenda');
ReactDOM.render(<Agenda />, agenda);