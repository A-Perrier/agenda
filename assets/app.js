import React from 'react';
import ReactDOM from 'react-dom';

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

const Agenda = () => {
  return <h1>Hello World !</h1>;
}

const rootElement = document.querySelector('#agenda');
ReactDOM.render(<Agenda />, rootElement);