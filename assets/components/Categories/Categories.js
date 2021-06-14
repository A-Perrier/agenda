import React, { useState } from 'react';
import './Categories.scss';
import { PlusIcon } from '../../shared/svg';
import CSS from '../../const';
import Counter from '../Globals/Counter';
import ColorPicker from './ColorPicker';
import Axios from 'axios';
import { CATEGORY_ENTRYPOINT } from '../../config';
import { errorMessage } from '../../shared/utils';


const Categories = ({ maxCategoryLength }) => {
  const [limitInputText, setLimitInputText] = useState(maxCategoryLength)

  const [newCategory, setNewCategory] = useState('')
  const [showInputError, setShowInputError] = useState(null)
  const [isInputActive, setIsInputActive] = useState(true)

  const [colorSelected, setColorSelected] = useState(null)
  const [showColorError, setShowColorError] = useState(null)

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
    category.length > 0 && setShowInputError(false)
  }

  const addCategory = (event) => {
    if (newCategory === '') {
      setShowInputError(true);
      return;
    }

    if (colorSelected === null) {
      setShowColorError(true);
      return;
    }
    //Axios.post('')
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
          <div className="categories__create-block">
            <div className="categories__form">
              <input type="text" placeholder="Nom de la catégorie" 
                    className="categories__input" value={newCategory} 
                    onChange={handleInputChange}
                    />
              { showInputError && errorMessage('Le nom ne peut rester vide') }
              <Counter limit={limitInputText} />
              <ColorPicker onColorSelected={(hex) => setColorSelected(hex)} />
              { showColorError && errorMessage('Une couleur doit être choisie') }
            </div>
            <button className="btn btn-submit" onClick={addCategory}>Créer</button>
          </div>
        }
      </section>
    </div>
  );
}
 
export default Categories;