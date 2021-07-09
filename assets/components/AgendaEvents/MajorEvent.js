import React from 'react';
import { Clock } from '../../shared/svg';
import bg1 from '../../img/daily-event_1.jpg'
import bg2 from '../../img/daily-event_2.jpg'
import bg3 from '../../img/daily-event_3.jpg'
import bg4 from '../../img/daily-event_4.jpg'
import bg5 from '../../img/daily-event_5.jpg'
import bg6 from '../../img/daily-event_6.jpg'
import bg7 from '../../img/daily-event_7.jpg'


const MajorEvent = ({ event, eventss }) => {
  const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7]
  const randomBg = backgrounds[Math.floor(Math.random()*backgrounds.length)]
  
  return ( 
    <div className="major-event__box" style={{backgroundImage: `url(${randomBg})`}}>
      <div className="major-event__time-until">
        <Clock />
        &nbsp; 30 min
      </div>
      <div className="major-event__content">
        <span className="major-event__time">
          { event.time }
        </span>
        <p className="major-event__name">
          { event.name }
        </p>
      </div>
      <button className="btn-event-reverse">Repousser</button>
    </div>
  );
}


export default MajorEvent;