import React, { useEffect, useState } from 'react';
import './Categories.scss';
import { PlusIcon } from '../../shared/svg';
import CSS from '../../const';
import Counter from '../Globals/Counter';
import ColorPicker from './ColorPicker';
import { findAll, create, remove } from '../../services/Api/Categories';
import { findAll as findAllEvents } from '../../services/Api/Events';
import { errorMessage, removeFromArray } from '../../shared/utils';
import Category, { CategoryToggler } from './Category';
import { EVENTS_FILTER } from '../../Store/Reducers/eventReducer';
import { connect } from 'react-redux';



const Categories = ({ maxCategoryLength, dispatch }) => {
  const [limitInputText, setLimitInputText] = useState(maxCategoryLength)
  const [categories, setCategories] = useState([])

  const [newCategory, setNewCategory] = useState('')
  const [showInputError, setShowInputError] = useState(null)
  const [isInputActive, setIsInputActive] = useState(false)

  const [colorSelected, setColorSelected] = useState(null)
  const [showColorError, setShowColorError] = useState(null)

  const [checkedCategories, setCheckedCategories] = useState([])

  async function fetchCategories () {
    const categories = await findAll()
    setCategories(categories)
    setCheckedCategories(categories)
  }


  useEffect(() => {
    fetchCategories()
  }, [])


  const onNewCategoryInteraction = () => setIsInputActive(!isInputActive)



  function handleInputChange ({ currentTarget }) {
    const category = currentTarget.value

    // Prévient du dépassement de la limite avec un CTRL+V
    if (category.length > maxCategoryLength) {
      setNewCategory(category.substr(0, maxCategoryLength))
      setLimitInputText(0)
      return
    }

    setNewCategory(category)
    setLimitInputText(maxCategoryLength - category.length)
    category.length > 0 && setShowInputError(false)
  }



  async function addCategory (event) {
    if (newCategory === '') {
      setShowInputError(true)
      return
    }

    if (colorSelected === null) {
      setShowColorError(true)
      return
    }

    const id = await create({ name: newCategory, color: colorSelected })
    const category = {id, name: newCategory, color: colorSelected}

    const copy = categories.slice()
    copy.push(category)
    setCategories(copy)
    checkedCategories.push(category)

    setNewCategory('')
  }


  async function deleteCategory (category) {
    const result = confirm("Voulez-vous vraiment supprimer la catégorie et tous les événements qui y sont associés ?")
    if (!result) return

    const statusCode = await remove(category)
    
    if (statusCode === 200) {
      const categoriesFiltered = removeFromArray(categories, category)
      setCategories(categoriesFiltered)
      
      const checkedCategoriesFiltered = removeFromArray(checkedCategories, category)
      setCheckedCategories(checkedCategoriesFiltered)
    }
  }



  async function handleCategorySelect (category) {
    const copy = checkedCategories.slice()
    copy.push(category)
    setCheckedCategories(copy)

    const action = { type: EVENTS_FILTER, value: { categories: copy, events: await findAllEvents() } }
    dispatch(action)
  }



  async function handleCategoryUnselect (category) {
    const copy = removeFromArray(checkedCategories, category)
    setCheckedCategories(copy)

    const action = { type: EVENTS_FILTER, value: { categories: copy, events: await findAllEvents() } }
    dispatch(action)
  }


  async function handleCategoryTogglerSelect () {
    setCheckedCategories(categories)

    const action = { type: EVENTS_FILTER, value: { categories, events: await findAllEvents() } }
    dispatch(action)
  }


  function handleCategoryTogglerUnselect () {
    setCheckedCategories([])

    const action = { type: EVENTS_FILTER, value: { categories: [], events: [] } }
    dispatch(action)
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
        <div className="categories-list">
          <CategoryToggler name="Tout cocher" onSelect={handleCategoryTogglerSelect} onUnselect={handleCategoryTogglerUnselect}/>
        {
          categories.map(category =>
            <Category 
              key={category.id}
              data={category} 
              onSelect={handleCategorySelect}
              onUnselect={handleCategoryUnselect} 
              isSelected={checkedCategories.includes(category)}
              onDelete={deleteCategory}
              />
          )
        }
        </div>
      </section>
    </div>
  )
}
 

export default connect()(Categories);