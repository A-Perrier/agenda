import React, { createRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Agenda.scss';
import '../bootstrap';
import Calendar from './Calendar/Calendar';
import Categories from './Categories/Categories';
import { findAll } from '../services/Api/Events'
import NextEvents from './AgendaEvents/NextEvents';



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
    // On réinitialise le tableau pour permettre l'instantanéité du chargement
    const events = await findAll()
    setDateEvents([])
    setDateEvents(events)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="agenda-container">
      <DateEventsContext.Provider value={events}>
        <DaySelectedContext.Provider value={value}>
            <Calendar onMonthChange={fetchEvents} />
            <Categories maxCategoryLength="40" />
        </DaySelectedContext.Provider>
      </DateEventsContext.Provider>
      <NextEvents limit={7} />
    </div>
  )
}

const agenda = document.querySelector('#agenda');
ReactDOM.render(<Agenda />, agenda);