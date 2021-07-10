import React from 'react';
import { Check, Clock, Cross } from '../../shared/svg';
import bg1 from '../../img/daily-event_1.jpg'
import bg2 from '../../img/daily-event_2.jpg'
import bg3 from '../../img/daily-event_3.jpg'
import bg4 from '../../img/daily-event_4.jpg'
import bg5 from '../../img/daily-event_5.jpg'
import bg6 from '../../img/daily-event_6.jpg'
import bg7 from '../../img/daily-event_7.jpg'
import { useState } from 'react';
import { edit } from '../../services/Api/Events';


const MajorEvent = ({ event }) => {
  const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7]
  const randomBg = backgrounds[Math.floor(Math.random()*backgrounds.length)]
  const [isEditing, setIsEditing] = useState(false)
  const [editableEvent, setEditableEvent] = useState({... event})
  const [timeToShow, setTimeToShow] = useState(event.time)
  
  
  function handlePostpone () {
    setIsEditing(true)
  }

  function handleEventTime (event) {
    setEditableEvent({
      ... editableEvent,
      time: event.target.value
    })
  }

  function handleEventTimeEdit () {
    edit(editableEvent)
    setIsEditing(false)
    setTimeToShow(editableEvent.time)
  }
  
  return ( 
    <div className="major-event__box" style={{backgroundImage: `url(${randomBg})`}}>
      <div className="major-event__time-until">
        <Clock />
        &nbsp; 30 min
      </div>
      <div className="major-event__content">
        <span className="major-event__time">
          { timeToShow }
        </span>
        <p className="major-event__name">
          { event.name }
        </p>
      </div>
      { !isEditing 
      ?
        <button className="btn-event-reverse" onClick={handlePostpone}>Repousser</button> 
      :
        <div className="time-input-container">
          <input type="time" min="00:00" max="23:00" step="300" value={editableEvent.time} onChange={handleEventTime} className="time-input"/>
          <Check onClick={handleEventTimeEdit}/>
          <Cross onClick={() => setIsEditing(false)}/>
        </div>
      }
    </div>
  );
}


export default MajorEvent;