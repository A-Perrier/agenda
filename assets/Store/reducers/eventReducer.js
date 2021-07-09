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

export function manageEvents (state = initialState, action) {
  let nextState

  switch (action.type) {
    case EVENTS_INITIALIZATION:
      nextState = {
        ... state,
        events: action.value
      }

      return nextState || state
      break;

    case EVENTS_RESET:
      nextState = { ... state, events: [] }
      return nextState || state
    default:
      return state
      break;
  }
}