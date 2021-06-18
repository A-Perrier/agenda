import React, { useContext, useEffect, useState } from 'react';
import { Cross, PlusIcon } from '../../shared/svg';
import { DaySelectedContext } from '../Agenda'
import CSS from '../../const'
import { findAll as findAllCategories} from '../../services/Api/Categories'
import { findAllByDate } from '../../services/Api/Events'
import { create } from '../../services/Api/Events'
import Event from './Event';

const DayEventBox = ({ fullDate, numericDate, YPos }) => {
  const { daySelected, setDaySelected } = useContext(DaySelectedContext)
  const [isCreationActive, setIsCreationActive] = useState(false)
  const [eventTime, setEventTime] = useState('00:00')
  const [eventName, setEventName] = useState('')
  const [eventCategory, setEventCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [dateEvents, setDateEvents] = useState([])

  async function fetchCategories () {
    const categories = await findAllCategories()
    setCategories(categories)
    setEventCategory(categories[0]?.name)
  }

  async function fetchEvents () {
    const events = await findAllByDate(numericDate)
    setDateEvents(events)
  }

  useEffect(() => {
    fetchEvents()
    fetchCategories()
  }, [])
  

  function onNewEventInteraction () {
    setIsCreationActive(true)
  }

  function handleEventTime (event) {
    setEventTime(event.target.value)
  }

  function handleEventName (event) {
    setEventName(event.target.value)
  }

  function handleEventCategory (event) {
    setEventCategory(event.target.value)
  }
  
  function handleClose () {
    setDaySelected(null)
    const selected = document.querySelector('.day.selected.event-box-opened')
    if (selected) selected.classList.remove('event-box-opened')
  }


  async function addAgendaEvent (event) {
    event.preventDefault()
    
    const id = await create({
      time: eventTime,
      name: eventName,
      category: eventCategory,
      date: numericDate
    })
  }

  console.log(dateEvents)

  return ( 
    <div className="day-event-box" style={{ top: `${YPos + CSS.rem(2.5)}px` }}>
      <Cross onClick={handleClose} />
      <section>
        <h1>
          <strong>{ fullDate }</strong>
        </h1>
        {
          !isCreationActive ?
          <p>
            Créer un évènement
            <PlusIcon onClick={onNewEventInteraction} />
          </p> :
          <form className="day-event-box__create-form" onSubmit={addAgendaEvent}>
            <input type="time" min="00:00" max="23:00" step="300" value={eventTime} onChange={handleEventTime} />
            &nbsp; - &nbsp;
            <input type="text" placeholder="Ajoutez un évènement" value={eventName} onChange={handleEventName} />
            <select value={eventCategory} onChange={handleEventCategory}>
              {
                categories.map(category => 
                <option key={category} value={category.name}>{category.name}</option>
                )
              }
            </select>
            <button className="btn btn-submit" type="submit">Créer</button>
          </form>
          
        }
      </section>
      <section className="day-event-box__events">
        <h1>
          <strong>Evènements</strong>
        </h1>
        {
          dateEvents.length > 0 ?
          dateEvents.map(event => 
            <Event key={event} data={event} />
          ) :
          <p>Il n'y a pas encore d'évènement</p>
        }
      </section>
    </div>
   );
}
 
export default DayEventBox;