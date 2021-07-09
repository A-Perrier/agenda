import React, { useEffect } from 'react';
import Month from './Month';
import { connect } from 'react-redux';
import { findAll } from '../../services/Api/Events';
import { EVENTS_INITIALIZATION, EVENTS_RESET } from '../../Store/Reducers/eventReducer';

const Calendar = ({ events, dispatch }) => {
  async function fetchEvents () {
    // On réinitialise le tableau pour permettre l'instantanéité du chargement
    const events = await findAll()
    let action = { type: EVENTS_RESET }
    dispatch(action)
    action = { type: EVENTS_INITIALIZATION, value: events }
    dispatch(action)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return ( 
    <div className="calendar" >
      <Month onMonthChange={fetchEvents} />
    </div>
   );
}
 

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(Calendar);