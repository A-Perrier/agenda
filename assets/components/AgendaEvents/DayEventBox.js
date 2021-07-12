import React, { useContext, useEffect, useState } from 'react';
import { Cross, PlusIcon } from '../../shared/svg';
import { DaySelectedContext } from '../Agenda'
import CSS from '../../const'
import { findAll as findAllCategories} from '../../services/Api/Categories'
import { create, remove } from '../../services/Api/Events'
import Event from './Event';
import { removeFromArray } from '../../shared/utils';
import OutsideClickHandler from 'react-outside-click-handler';
import { connect } from 'react-redux';
import { EVENTS_CREATE, EVENTS_EDIT, EVENTS_REFRESH, EVENTS_REMOVE } from '../../Store/Reducers/eventReducer';

const DayEventBox = ({ 
  fullDate, 
  numericDate, 
  YPos, 
  onEventCreate, 
  events, 
  afterEventDeleted, 
  removeBox,
  dispatch // from Redux
}) => {
  const { daySelected, setDaySelected } = useContext(DaySelectedContext)
  const [isCreationActive, setIsCreationActive] = useState(false)
  const [eventTime, setEventTime] = useState('00:00')
  const [eventName, setEventName] = useState('')
  const [eventCategory, setEventCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [dateEvents, setDateEvents] = useState(events)

  async function fetchCategories () {
    const categories = await findAllCategories()
    setCategories(categories)
    setEventCategory(categories[0]?.name)
  }



  useEffect(() => {
    fetchCategories()
  }, [])
  


  function onEventInteraction (event = null) {
    if (!event.id) {
      setIsCreationActive(true)
    } else {
      console.log(event.id)
    }
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
    
    const agendaEvent = await create({
      time: eventTime,
      name: eventName,
      category: eventCategory,
      date: numericDate
    })
    
    const copy = dateEvents.slice()
    copy.push(agendaEvent)
    setDateEvents(copy)
    onEventCreate(agendaEvent.category.color)
    
    let action = { type: EVENTS_CREATE, value: agendaEvent }
    dispatch(action)
  }



  function onEdit (eventModified, prevEvent) {
    let copy = dateEvents.slice()
    const eventIndex = copy.indexOf(prevEvent)
    copy.splice(eventIndex, 1, eventModified)
    setDateEvents(copy)
    onEventCreate(eventModified.category.color, eventIndex)
    
    let action = { type: EVENTS_EDIT, value: { eventModified, prevEvent } }
    dispatch(action)
  }



  async function deleteEvent (event) {
    const statusCode = await remove(event)
    
    if (statusCode === 200) {
      const action = { type: EVENTS_REMOVE, value: event }
      dispatch(action)
      const eventsFiltered = removeFromArray(dateEvents, event)
      setDateEvents(eventsFiltered)
      afterEventDeleted(eventsFiltered)
    }
  }


  return ( 
    <OutsideClickHandler onOutsideClick={removeBox} >
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
              <PlusIcon onClick={onEventInteraction} />
            </p> :
            <form className="day-event-box__create-form" onSubmit={addAgendaEvent}>
              <input type="time" min="00:00" max="23:00" step="300" value={eventTime} onChange={handleEventTime} />
              &nbsp; - &nbsp;
              <input type="text" placeholder="Ajoutez un évènement" value={eventName} onChange={handleEventName} />
              <select value={eventCategory} onChange={handleEventCategory}>
                {
                  categories.map((category, i) => 
                  <option key={i} value={category.name}>{category.name}</option>
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
              <Event 
              key={event} 
              data={event} 
              onDelete={deleteEvent} 
              onEditClick={() => setIsCreationActive(false)}
              onEdit={(eventModified, prevEvent) => onEdit(eventModified, prevEvent)} 
              categories={categories} 
              />
            ) :
            <p>Il n'y a pas encore d'évènement</p>
          }
        </section>
      </div>
    </OutsideClickHandler>
   );
}


const mapStateToProps = (state) => {
  return {
    eventsInStore: state.events
  }
}

export default connect(mapStateToProps)(DayEventBox);