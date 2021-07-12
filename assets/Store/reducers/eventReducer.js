const initialState = {
  events: []
}


/**
 * Necessary to refresh monthly events
 */
export const EVENTS_RESET = 'EVENTS_RESET'

/**
 * Event reducer action type
 */
export const EVENTS_INITIALIZATION = 'EVENTS_INITIALIZATION'

/**
 * Event reducer action type
 */
export const EVENTS_REFRESH = 'EVENTS_REFRESH'

/**
 * Event reducer action type
 */
export const EVENTS_CREATE = 'EVENTS_CREATE'

/**
 * Event reducer action type
 */
export const EVENTS_EDIT = 'EVENTS_EDIT'

/**
 * Event reducer action type
 */
export const EVENTS_REMOVE = 'EVENTS_REMOVE'

export function manageEvents (state = initialState, action) {
  let nextState
  let eventsCopy

  switch (action.type) {

    case EVENTS_RESET:
      nextState = { ... state, events: [] }
      return nextState || state



    case EVENTS_INITIALIZATION:
      nextState = {
        ... state,
        events: action.value
      }
      return nextState || state
      break;



    case EVENTS_REFRESH:
       // Just acts as a refresh of the state, since 
      eventsCopy = state.events.slice()

      nextState = {
        ... state,
        events: eventsCopy
      }

      return nextState || state
      break;


    
    case EVENTS_CREATE: 
      eventsCopy = state.events.slice()
      eventsCopy.push(action.value)

      nextState = {
        ... state, 
        events: eventsCopy
      }

      return nextState || state
      break;


    
    case EVENTS_EDIT: 
      let { eventModified, prevEvent } = action.value
      eventsCopy = state.events.slice()
      let eventIndex = eventsCopy.indexOf(prevEvent)
      eventsCopy.splice(eventIndex, 1, eventModified)
      
      nextState = {
        ... state, 
        events: eventsCopy
      }

      return nextState || state
      break;



    case EVENTS_REMOVE: 
      eventsCopy = state.events.slice().filter(event => event !== action.value)
      
      nextState = {
        ... state, 
        events: eventsCopy
      }

      return nextState || state
      break;


      
    default:
      return state
      break;
  }
}