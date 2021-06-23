import React, { useEffect, useState } from 'react';
import { actualDate, getFormattedDate } from '../../shared/utils';

const NextEvents = ({ limit }) => {
  const [events, setEvents] = useState([])

  const limitDateTime = new Date(actualDate(true))
  limitDateTime.setDate(limitDateTime.getDate() + limit)
  const limitDate = getFormattedDate(limitDateTime)
  
  async function fetchEvents () {
    const events = await findAllUntil(limitDate)
    setEvents(events)
    console.log(events)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return ( 
    <></>
  );
}
 
export default NextEvents;