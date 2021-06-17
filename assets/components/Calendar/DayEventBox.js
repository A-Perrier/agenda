import React, { useContext, useEffect, useState } from 'react';
import { Cross, PlusIcon } from '../../shared/svg';
import { DaySelectedContext } from '../Agenda'
import CSS from '../../const'
import { findAll } from '../../services/Api/Categories'

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
  }

  function handleEventName (event) {
    setEventName(event.target.value)
  }

  function handleEventCategory (event) {
    setEventCategory(event.target.value)
  }


  return ( 
    <div className="day-event-box" style={{ top: `${YPos + CSS.rem(1.5)}px` }}>
      <Cross onClick={() => setDaySelected(null)} />
      <h1>
        <strong>{ fullDate }</strong>
      </h1>
      {
        !isCreationActive ?
        <p>
          Créer un évènement
          <PlusIcon onClick={onNewEventInteraction} />
        </p> :
        <form className="day-event-box__create-form">
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