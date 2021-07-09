import { createStore } from 'redux'
import { manageEvents } from './Reducers/eventReducer'

export default createStore(
  manageEvents,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)