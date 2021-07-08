import React, { useEffect, useState } from 'react';
import { findAllUntil } from '../../services/Api/Events';
import { actualDate, getFormattedDate } from '../../shared/utils';

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
    //console.log(events)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return ( 
    <></>
  );
}
 
export default NextEvents;