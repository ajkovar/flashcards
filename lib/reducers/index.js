import { combineReducers } from 'redux'
import without from 'lodash/without'
import update from "react-addons-update"

import {
  ADD_WORD,
  REMOVE_WORD,
  REQUEST_TRANSLATIONS,
  TRANSLATIONS_RECEIVED,
  SELECT_TRANSLATION
} from '../actions'

function rootReducer(state = {
  words: [],
  textInfoById: {}
}, action) {
  switch (action.type) {
    case REQUEST_TRANSLATIONS:
      return update(state, {
        textInfoById: { '$merge': { [action.text]: { isFetching: true } } }
      })
    case TRANSLATIONS_RECEIVED:
      return update(state, {
        textInfoById: { '$merge': { [action.text]: {
          isFetching: false,
          translations: action.translations
        }}}
      })
    case SELECT_TRANSLATION:
      const { translations } = state.textInfoById[action.text]
      const index = translations.indexOf(action.translation)
      return update(state, {
        textInfoById: {
          [action.text]: {
            translations: {
              [index]: {
                 isSelected: { $set: !action.translation.isSelected }
              }
            }
          }
        }
      })
    case ADD_WORD:
      return Object.assign({}, state, { words: state.words.concat(action.word) })
    case REMOVE_WORD:
      return Object.assign({}, state, { words: without(state.words, action.word) })
    default:
      return state
  }
}

export default rootReducer
