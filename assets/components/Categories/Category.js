import React, { useState } from 'react';

const Category = ({data, onSelect, onUnselect}) => {
  const { id, name, color } = data
  const [isSelected, setIsSelected] = useState(true)

  const handleSelect = () => {
    setIsSelected(!isSelected)
    !isSelected === true ? onSelect(data) : onUnselect(data)
  }

  return ( 
    <div className="category" index={id}>
      <p>
        <span className={`icon checkbox ${isSelected ? 'selected' : ''}`} style={{backgroundColor: color}} onClick={handleSelect}></span>
        { name }
      </p>
    </div>
   );
}
 
export default Category;