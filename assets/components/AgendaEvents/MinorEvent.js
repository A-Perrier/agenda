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
import { getTimeUntil, frFormatToDateTime } from '../../shared/utils';

const MinorEvent = ({ event }) => {
  const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7]
  const randomBg = backgrounds[Math.floor(Math.random()*backgrounds.length)]
  const [timeLeft, setTimeLeft] = useState({})

  const now = new Date()
  const isTomorrow = timeLeft.days === 1 || (timeLeft.days === 0 && timeLeft.hours > now.getHours())
  const isAfterTomorrow = timeLeft.days === 2 || (timeLeft.days === 1 && timeLeft.hours > now.getHours())


  useEffect(() => {
    const time = getTimeUntil(frFormatToDateTime(event.date, event.time, true))
    setTimeLeft(time)
  }, [])

  
  return (
    <div className="next-event__box" style={{backgroundImage: `url(${randomBg})`}}>
      <div className="next-event__time-until" style={{ backgroundColor: event.category.color, opacity: .8 }}>
        <Clock />
        &nbsp; {
          isTomorrow ? 'Demain à ' : 
          isAfterTomorrow ? 'Après-demain à ' : 
          `Dans ${timeLeft.days} jours à `
          } { event.time }
      </div>
      <div className="next-event__content minor-event">
        <p className="next-event__name minor-event event">
          <span className="event__category-color" style={{backgroundColor: event.category.color}}></span>
          &nbsp;
          {event.name}
        </p>
      </div>
    </div>
  );
}
 
export default MinorEvent;