import React from 'react';

const Event = ({ data }) => {

  return ( 
    <p className="event">
      <span className="event__category-color" style={{backgroundColor: data.category.color}}></span>
      <strong className="event__time">
        {data.time} - &nbsp;
      </strong>
      {data.name}
    </p>
  );
}
 
export default Event;