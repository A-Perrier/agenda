import React, { useContext } from 'react';
import { Cross } from '../../shared/svg';
import { DaySelectedContext } from '../Agenda'
import CSS from '../../const'

const DayEventBox = ({ fullDate, numericDate, YPos }) => {
  const { daySelected, setDaySelected } = useContext(DaySelectedContext)

  return ( 
    <div className="day-event-box" style={{ top: `${YPos + CSS.rem(1.5)}px` }}>
      <Cross onClick={() => setDaySelected(null)} />

      <h1>{ fullDate }</h1>
    </div>
   );
}
 
export default DayEventBox;