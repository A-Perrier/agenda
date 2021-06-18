import React, { useContext, useEffect, useState } from 'react';
import { Cross, PlusIcon } from '../../shared/svg';
import { DaySelectedContext } from '../Agenda'
import CSS from '../../const'
import { findAll } from '../../services/Api/Categories'
import { create } from '../../services/Api/Events'

const DayEventBox = ({ fullDate, numericDate, YPos }) => {
  const { daySelected, setDaySelected } = useContext(DaySelectedContext)
  const [isCreationActive, setIsCreationActive] = useState(true)
  const [eventTime, setEventTime] = useState('00:00')
  const [eventName, setEventName] = useState('')
  const [eventCategory, setEventCategory] = useState('')
  const [categories, setCategories] = useState([])

  async function fetchCategories () {
    const categories = await findAll()
    setCategories(categories)
  }

  useEffect(() => {
    fetchCategories()
    setEventCategory(categories[0]?.name)
  }, [categories])

  function onNewEventInteraction () {
    setIsCreationActive(true)
  }

  function handleEventTime (event) {
    setEventTime(event.target.value)
    console.log(eventTime)
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

    console.log(id)
  }

  return ( 
    <div className="day-event-box" style={{ top: `${YPos + CSS.rem(2.5)}px` }}>
      <Cross onClick={handleClose} />
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
    </div>
   );
}
 
export default DayEventBox;