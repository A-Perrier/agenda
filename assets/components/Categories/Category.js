import React from 'react';

const Category = ({id, name, color, isSelected}) => {

  return ( 
    <div className="category" index={id}>
      <p>
        <span className={`checkbox ${isSelected ? 'selected' : ''}`} style={{backgroundColor: color}}></span>
        { name }
      </p>
    </div>
   );
}
 
export default Category;