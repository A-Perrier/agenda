import React, { createRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Agenda.scss';
import '../bootstrap';
import Calendar from './Calendar/Calendar';
import Categories from './Categories/Categories';
import NextEvents from './AgendaEvents/NextEvents';

import { Provider } from 'react-redux'
import Store from '../Store/configureStore'




export const DaySelectedContext = React.createContext({
  daySelected: null, setDaySelected: () => {}
})


const Agenda = () => {
  const [daySelected, setDaySelected] = useState(null)
  const value = { daySelected, setDaySelected }


  return (
    <div className="agenda-container">
      <Provider store={Store}>
        <DaySelectedContext.Provider value={value}>
            <Calendar />
            <Categories maxCategoryLength="40" />
        </DaySelectedContext.Provider>
        <NextEvents limit={7} />
      </Provider>
    </div>
  )
}

const agenda = document.querySelector('#agenda');
ReactDOM.render(<Agenda />, agenda);