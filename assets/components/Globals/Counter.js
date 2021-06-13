import React from 'react';

const Counter = ({ limit }) => {
  return ( 
    <span className={`counter ${+limit === 0 ? "counter-blocked" : ''}`}>{ +limit }</span>
  );
}
 
export default Counter;