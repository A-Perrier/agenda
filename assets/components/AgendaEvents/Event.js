import React from 'react';
import { useState } from 'react';
import { Bin, EditIcon } from '../../shared/svg';
import { edit } from '../../services/Api/Events'

const Event = ({ 
  data, 
  onDelete,
  onEditClick,
  onEdit,
  categories
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingTime, setEditingTime] = useState(data.time)
  const [editingName, setEditingName] = useState(data.name)
  const [editingCategory, setEditingCategory] = useState(data.category.name)

  function handleEventTime (event) {
    setEditingTime(event.target.value)
  }



  function handleEventName (event) {
    setEditingName(event.target.value)
  }



  function handleEventCategory (event) {
    setEditingCategory(event.target.value)
  }


  async function editAgendaEvent (event) {
    event.preventDefault()
 
    const agendaEvent = await edit({
      id: data.id,
      time: editingTime,
      name: editingName,
      category: editingCategory
    })
    
    onEdit(agendaEvent, data)
  }

  return ( 
    <>
    <p className="event">
      <span className="event__category-color" style={{backgroundColor: data.category.color}}></span>
      <strong className="event__time">
        {data.time} - &nbsp;
      </strong>
      {data.name}
      &nbsp;
      <Bin onClick={() => onDelete(data)} />
      <EditIcon onClick={() => { setIsEditing(!isEditing); onEditClick() }} />
    </p>
    { 
      isEditing &&
      <form className="day-event-box__create-form" onSubmit={editAgendaEvent}>
        <input type="time" min="00:00" max="23:00" step="300" value={editingTime} onChange={handleEventTime} />
        &nbsp; - &nbsp;
        <input type="text" placeholder="Ajoutez un évènement" value={editingName} onChange={handleEventName} />
        <select value={editingCategory} onChange={handleEventCategory}>
          {
            categories.map((category, i) => 
            <option key={i} value={category.name}>{category.name}</option>
            )
          }
        </select>
        <button className="btn btn-submit" type="submit">Modifier</button>
      </form>
    }
    </>
  );
}
 
export default Event;