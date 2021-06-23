import React from 'react';
import { Bin } from '../../shared/svg';

const Event = ({ data, onDelete }) => {

  return ( 
    <p className="event">
      <span className="event__category-color" style={{backgroundColor: data.category.color}}></span>
      <strong className="event__time">
        {data.time} - &nbsp;
      </strong>
      {data.name}
      &nbsp;
      <Bin onClick={() => onDelete(data)}/>
    </p>
  );
}
 
export default Event;