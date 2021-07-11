import React from 'react';
import { Check, Clock, Cross } from '../../shared/svg';
import bg1 from '../../img/daily-event_1.jpg'
import bg2 from '../../img/daily-event_2.jpg'
import bg3 from '../../img/daily-event_3.jpg'
import bg4 from '../../img/daily-event_4.jpg'
import bg5 from '../../img/daily-event_5.jpg'
import bg6 from '../../img/daily-event_6.jpg'
import bg7 from '../../img/daily-event_7.jpg'
import { useState, useEffect } from 'react';
import { edit } from '../../services/Api/Events';
import { getTimeUntil } from '../../shared/utils';


const MajorEvent = ({ event }) => {
  const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7]
  const randomBg = backgrounds[Math.floor(Math.random()*backgrounds.length)]

  const [isEditing, setIsEditing] = useState(false)
  const [editableEvent, setEditableEvent] = useState({... event})

  const [timeToShow, setTimeToShow] = useState(event.time)
  const [timeLeft, setTimeLeft] = useState({})

  const [isPassed, setIsPassed] = useState(false)


  useEffect(() => {
    const hours = editableEvent.time.split(':')[0]
    const minutes = editableEvent.time.split(':')[1]
    
    const time = getTimeUntil((new Date().setHours(hours, minutes, 0)))
    setTimeLeft(time)
    setIsPassed(time.isPassed)
  }, [timeToShow])


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
    <>
    {!isPassed &&
      <div className="next-event__box" style={{backgroundImage: `url(${randomBg})`}}>
        <div className="next-event__time-until" style={{ backgroundColor: event.category.color, opacity: .8 }}>
          <Clock />
          &nbsp; {timeLeft.hours > 0 && `${timeLeft.hours}h`} {timeLeft.minutes}min
        </div>
        <div className="next-event__content">
          <span className="next-event__time">
            { timeToShow }
          </span>
          <p className="next-event__name event">
            <span className="event__category-color" style={{backgroundColor: event.category.color}}></span>
            &nbsp;
            { event.name }
          </p>
        </div>
        { !isEditing 
        ?
          <button className="btn-event-reverse" onClick={() => setIsEditing(true)}>Repousser</button> 
        :
          <div className="time-input-container">
            <input type="time" min={event.time} max="23:00" step="300" value={editableEvent.time} onChange={handleEventTime} className="time-input"/>
            <Check onClick={handleEventTimeEdit}/>
            <Cross onClick={() => setIsEditing(false)}/>
          </div>
        }
      </div>
    }
    </>
  );
}


export default MajorEvent;