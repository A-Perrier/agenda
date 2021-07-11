import React, { useEffect, useState } from 'react';
import { findAllUntil } from '../../services/Api/Events';
import { actualDate, getFormattedDate } from '../../shared/utils';
import MajorEvent from './MajorEvent';
import MinorEvent from './MinorEvent';

/**
 * This componenent retrieve the last { limit } events to display them at the bottom of the agenda
 */
const NextEvents = ({ limit }) => {
  const [events, setEvents] = useState([])

  const limitDateTime = new Date(actualDate(true))
  limitDateTime.setDate(limitDateTime.getDate() + limit)
  const limitDate = getFormattedDate(limitDateTime)
  
  async function fetchEvents () {
    const events = await findAllUntil(limitDate)
    setEvents(events)
  }

  useEffect(() => {
    fetchEvents()
  }, [])
  
  
  

  return ( 
    <section className="next-events">
      { 
        events.map(event => {
          if (actualDate() === event.date) return <MajorEvent event={event} key={event}/>
          else return <MinorEvent event={event} key={event}/>
        })
      }
    </section>
  );
}
 
export default NextEvents;