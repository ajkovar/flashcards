import fetch from 'isomorphic-fetch'

export const REQUEST_TRANSLATIONS = 'REQUEST_TRANSLATIONS'
function requestTranslations(text) {
  return { type: REQUEST_TRANSLATIONS, text }
}

export const TRANSLATIONS_RECEIVED = 'TRANSLATIONS_RECEIVED'
function translationsReceived(text, translations) {
  return { type: TRANSLATIONS_RECEIVED, text, translations }
}

export const SELECT_TRANSLATION = 'SELECT_TRANSLATION'
export function selectTranslation(text, translation) {
  return { type: SELECT_TRANSLATION, text, translation }
}

export const ADD_TRANSLATION = 'ADD_TRANSLATION'
export function addTranslation(text, translation) {
  return { type: ADD_TRANSLATION, text, translation }
}

export function fetchTranslations(word) {
  return async function(dispatch, getState) {
    const textInfoById = getState().textInfoById || {}
    const translationObject = textInfoById[word] || {}
    if(translationObject.isFetching){
      return
    }
    if(translationObject.translations){
      dispatch(translationsReceived(word, translationObject.translations))
    }
    else {
      dispatch(requestTranslations(word))
      let response = await fetch(`/api/translate?text=${word}`)
      let translation = await response.text()
      dispatch(translationsReceived(word, [{
        text: translation,
        isSelected: word !== translation
      }]))
    }
  }
}

export const ADD_WORD = 'ADD_WORD'
export function addWord(word) {
  return { type: ADD_WORD, word }
}

export const REMOVE_WORD = 'REMOVE_WORD'
export function removeWord(word) {
  return { type: REMOVE_WORD, word }
}

export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER'
export function changeSortOrder(sortBy) {
  return function(dispatch, getState) {
    dispatch({ type: CHANGE_SORT_ORDER, sortBy })
    dispatch({ type: CHANGE_SORT_ORDER, sortBy })
  }
}
