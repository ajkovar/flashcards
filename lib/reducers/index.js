import { combineReducers } from 'redux'
import {
  ADD_WORD
} from '../actions'

function rootReducer(state = {
  words: [],
  isFetching: false
}, action) {
  console.log(rootReducer)
  switch (action.type) {
    case ADD_WORD:
      return Object.assign({}, state, { words: state.words.concat(action.word) })
    default:
      return state
  }
}

export default rootReducer
