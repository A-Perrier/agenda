import React, { useState } from 'react';
import './ColorPicker.scss';

const ColorPicker = ({ onColorSelected }) => {
  const colors = ["#CB28E0", "#72B514", "#46BBDB", "#EB7221", "#E01563"];
  const [colorSelected, setColorSelected] = useState(null);

  const handleSelect = (hex) => {
    if (hex === colorSelected) return;

    const colors = document.querySelectorAll('.color-picker__choice');
    colors.forEach(el => el.classList.remove('selected'));
    setColorSelected(hex);
    onColorSelected(hex);
  }

  return ( 
    <div className="color-picker">
      { colors.map(hex => 
        <Color key={hex} hex={hex} handleSelect={handleSelect} isSelected={hex === colorSelected} />
      ) }
    </div>
   );
}

const Color = ({ hex, handleSelect, isSelected }) => 
    <div 
      className={`color-picker__choice ${isSelected ? 'selected' : ''}` } 
      style={{ backgroundColor: hex }} 
      onClick={() => handleSelect(hex)}>
    </div>

 
export default ColorPicker;