import React, { createRef, useState } from 'react';
import ReactDOM from 'react-dom';

// any CSS you import will output into a single css file (app.css in this case)
import './Agenda.scss';

// start the Stimulus application
import '../bootstrap';
import Calendar from './Calendar/Calendar';
import Categories from './Categories/Categories';



const Agenda = () => {

  return (
  <div className="agenda-container">
    <Calendar />
    <Categories maxCategoryLength="40" />
  </div>);
}

const agenda = document.querySelector('#agenda');
ReactDOM.render(<Agenda />, agenda);