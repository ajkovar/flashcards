import { getCards, getTranslations } from '../selectors'
import sample from 'lodash/sample'
import sampleSize from 'lodash/sampleSize'
import without from 'lodash/without'

export default function generateRandomQuestion(state) {
  const cards = getCards(state)
  if(cards.length > 0) {
    const { text } = sample(getCards(state))
    const card = state.textInfoById[text]
    const translations = getTranslations(state)
    const possibleAnswers = sampleSize(translations, 6)
            .concat(without(card.translations[0], text))
            .map((translation) => translation.text)
    return { text, possibleAnswers }
  }
  return null
}
