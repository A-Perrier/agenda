import React, { useState } from 'react';
import './Categories.scss';
import { PlusIcon } from '../../shared/svg';
import CSS from '../../const';
import Counter from '../Globals/Counter';
import ColorPicker from './ColorPicker';


const Categories = ({ maxCategoryLength }) => {
  const [newCategory, setNewCategory] = useState('')
  const [limitInputText, setLimitInputText] = useState(maxCategoryLength)
  const [isInputActive, setIsInputActive] = useState(true)

  const onNewCategoryInteraction = () => setIsInputActive(!isInputActive)

  const handleInputChange = ({ currentTarget }) => {
    const category = currentTarget.value;

    // Prévient du dépassement de la limite avec un CTRL+V
    if (category.length > maxCategoryLength) {
      setNewCategory(category.substr(0, maxCategoryLength));
      setLimitInputText(0)
      return;
    }

    setNewCategory(category)
    setLimitInputText(maxCategoryLength - category.length)
  }

  const handleSubmit = (event) => {
    const keyCode = event.which;
    if (keyCode !== 13) return

    
  }
 
  return ( 
    <div className="categories-container">
      <h1>
        Catégories
        <PlusIcon onClick={onNewCategoryInteraction} fill={isInputActive && CSS.secondary} className="icon"/>
      </h1>
      <section className="categories">
        { 
          isInputActive &&
          <>
            <input type="text" placeholder="Nom de la catégorie" 
                   className="categories__input" value={newCategory} 
                   onChange={handleInputChange} onKeyUp={handleSubmit}
                  />
            <Counter limit={limitInputText} />
            <ColorPicker />
          </>
        }
      </section>
    </div>
  );
}
 
export default Categories;