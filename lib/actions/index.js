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
