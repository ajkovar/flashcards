import { combineReducers } from 'redux'
import without from 'lodash/without'
import update from 'react-addons-update'
import { getCards } from '../selectors'
import sample from 'lodash/sample'

import {
  ADD_WORD,
  REMOVE_WORD,
  REQUEST_TRANSLATIONS,
  TRANSLATIONS_RECEIVED,
  SELECT_TRANSLATION,
  ADD_TRANSLATION
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
      let nextState = update(state, {
        textInfoById: { [action.word]: { isSaved: { $set: true }}}
      })
      return update(nextState, {
        currentCard: {
          $set: state.currentCard ?
            state.currentCard :
            sample(getCards(nextState)).text
        }
      })
    case REMOVE_WORD:
      nextState = update(state, {
        textInfoById: { [action.word]: { isSaved: { $set: true }}}
      })
      const nextCard = getCards(nextState).length > 0 ? sample(getCards(nextState)).text : null
      return update(nextState, {
        currentCard: { $set: state.currentCard !== action.word ? state.currentCard : nextCard }
      })
    default:
      return state
  }
}

export default rootReducer
