import React from 'react';
import './Categories.scss'
import { PlusIcon } from '../../shared/svg'
const Categories = () => {
  return ( 
    <div className="categories-container">
      <h1>Catégories</h1> 
      <PlusIcon className="icon " onClick={() => console.log('click !')}/>
    </div>
  );
}
 
export default Categories;