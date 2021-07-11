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


  useEffect(() => {
    const time = getTimeUntil(frFormatToDateTime(event.date, event.time, true))
    setTimeLeft(time)
  }, [])

  
  return (
    <div className="major-event__box" style={{backgroundImage: `url(${randomBg})`}}>
      <div className="major-event__time-until">
        <Clock />
        &nbsp; {timeLeft.days > 0 && `${timeLeft.days}j`} {timeLeft.hours > 0 && `${timeLeft.hours}h`} {timeLeft.minutes}min
      </div>
      <div className="major-event__content">
        <span className="major-event__time">
          { event.time }
        </span>
        <p className="major-event__name">
          { event.name }
        </p>
      </div>
    </div>
  );
}
 
export default MinorEvent;