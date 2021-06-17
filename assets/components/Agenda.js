import React, { createRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './Agenda.scss';
import '../bootstrap';
import Calendar from './Calendar/Calendar';
import Categories from './Categories/Categories';



export const DaySelectedContext = React.createContext({
  daySelected: null, setDaySelected: () => {}
})


const Agenda = () => {
  const [daySelected, setDaySelected] = useState(null)
  const value = { daySelected, setDaySelected }

  console.log(value)

  return (
    <DaySelectedContext.Provider value={value}>
      <div className="agenda-container">
        <Calendar />
        <Categories maxCategoryLength="40" />
      </div>
    </DaySelectedContext.Provider>
  )
}

const agenda = document.querySelector('#agenda');
ReactDOM.render(<Agenda />, agenda);