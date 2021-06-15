import React, { useState } from 'react';
import CSS from '../../const';

const Category = ({ data, onSelect, onUnselect, isSelected }) => {
  const { id, name, color } = data

  const handleSelect = () => {
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

export const CategoryToggler = ({ name, onSelect, onUnselect }) => {
  const [isSelected, setIsSelected] = useState(true)

  const handleSelect = () => {
    setIsSelected(!isSelected)
    !isSelected === true ? onSelect() : onUnselect()
  }

  return (
    <div className="category">
      <p>
        <span className={`icon checkbox ${isSelected ? 'selected' : ''}`} style={{backgroundColor: CSS.primary}} onClick={handleSelect}></span>
        { name }
      </p>
    </div>
  )
}

export default Category;