import { combineReducers } from 'redux'
import without from 'lodash/without'
import update from 'react-addons-update'

import {
  ADD_WORD,
  REMOVE_WORD,
  REQUEST_TRANSLATIONS,
  TRANSLATIONS_RECEIVED,
  SELECT_TRANSLATION,
  ADD_TRANSLATION,
  SET_CURRENT_CARD
} from '../actions'

function rootReducer(state = {
  textInfoById: {}
}, action) {
  switch (action.type) {
    case REQUEST_TRANSLATIONS:
      return update(state, {
        textInfoById: { '$merge': { [action.text]: {
          text: action.text,
          isFetching: true
        }}}
      })
    case TRANSLATIONS_RECEIVED:
      return update(state, {
        textInfoById: {  [action.text]: { $merge: {
          isFetching: false,
          translations: action.translations.filter(translation => {
            return translation.text.toLowerCase() !== action.text.toLowerCase()
          })
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
    case ADD_TRANSLATION:
      return update(state, {
        textInfoById: {
          [action.text]: {
            translations: {
              $push: [{text: action.translation, isSelected: true}]
            }
          }
        }
      })
    case ADD_WORD:
      return update(state, {
        textInfoById: { [action.word]: { isSaved: { $set: true }}}
      })
    case REMOVE_WORD:
      return update(state, {
        textInfoById: { [action.word]: { isSaved: { $set: false }}}
      })
    case SET_CURRENT_CARD:
    return update(state, { currentCard: { $set: action.currentCard }})
    default:
      return state
  }
}

export default rootReducer
