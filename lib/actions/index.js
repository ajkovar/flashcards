import fetch from 'isomorphic-fetch';
import generateRandomQuestion from '../util/generate-random-question';

export const REQUEST_TRANSLATIONS = 'REQUEST_TRANSLATIONS';
function requestTranslations(text) {
  return { type: REQUEST_TRANSLATIONS, text };
}

export const TRANSLATIONS_RECEIVED = 'TRANSLATIONS_RECEIVED';
function translationsReceived(text, translations) {
  return { type: TRANSLATIONS_RECEIVED, text, translations };
}

export const SELECT_TRANSLATION = 'SELECT_TRANSLATION';
export function selectTranslation(text, translation) {
  return { type: SELECT_TRANSLATION, text, translation };
}

export const ADD_TRANSLATION = 'ADD_TRANSLATION';
export function addTranslation(text, translation) {
  return { type: ADD_TRANSLATION, text, translation };
}

export function fetchTranslations(word) {
  return async function(dispatch, getState) {
    const { textInfoById = {} } = getState();
    const translationObject = textInfoById[word] || {};
    if (translationObject.isFetching) {
      return;
    }
    if (!translationObject.translations) {
      dispatch(requestTranslations(word));
      let response = await fetch(`/api/translate?text=${word}`);
      let translation = await response.text();
      dispatch(
        translationsReceived(word, [
          {
            text: translation,
            isSelected: word !== translation,
          },
        ])
      );
    }
  };
}

export const SET_CURRENT_QUESTION = 'SET_CURRENT_CARD';
export function setCurrentQuestion(currentQuestion) {
  return { type: SET_CURRENT_QUESTION, currentQuestion };
}

export const ADD_WORD = 'ADD_WORD';
export function addWord(word) {
  return async function(dispatch, getState) {
    dispatch({ type: ADD_WORD, word });
    const state = getState();
    if (!state.currentQuestion) {
      dispatch(setCurrentQuestion(generateRandomQuestion(state)));
    }
  };
}

export const REMOVE_WORD = 'REMOVE_WORD';
export function removeWord(word) {
  return async function(dispatch, getState) {
    dispatch({ type: REMOVE_WORD, word });
    const state = getState();
    if (state.currentQuestion.text === word) {
      dispatch(setCurrentQuestion(generateRandomQuestion(state)));
    }
  };
}

export const SELECT_ANSWER = 'SELECT_ANSWER';
export const RIGHT_ANSWER = 'RIGHT_ANSWER';
export const WRONG_ANSWER = 'WRONG_ANSWER';
export function selectAnswer(question, answer) {
  return async function(dispatch, getState) {
    const state = getState();
    const textInfo = state.textInfoById[question];
    const translations = textInfo.translations.map(t => t.text);
    const isRightAnswer = translations.indexOf(answer) > -1;
    if (isRightAnswer) {
      dispatch({ type: RIGHT_ANSWER, question, correctAnswers: translations });
    } else {
      dispatch({ type: WRONG_ANSWER, question, correctAnswers: translations });
    }
    setTimeout(() => {
      dispatch(setCurrentQuestion(generateRandomQuestion(state)));
    }, isRightAnswer ? 800 : 3000);
  };
}

export const TOGGLE_CARD_LIST = 'TOGGLE_CARD_LIST';
export function toggleCardList() {
  return { type: TOGGLE_CARD_LIST };
}
