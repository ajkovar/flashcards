import { combineReducers } from 'redux'
import without from 'lodash/without'
import {
  ADD_WORD,
  REMOVE_WORD
} from '../actions'

function rootReducer(state = {
  words: [],
  isFetching: false
}, action) {
  switch (action.type) {
    case ADD_WORD:
      return Object.assign({}, state, { words: state.words.concat(action.word) })
    case REMOVE_WORD:
      return Object.assign({}, state, { words: without(state.words, action.word) })
    default:
      return state
  }
}

export default rootReducer
