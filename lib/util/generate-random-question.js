import { getCards, getTranslations } from '../selectors'
import sample from 'lodash/sample'
import sampleSize from 'lodash/sampleSize'
import without from 'lodash/without'
import shuffle from 'lodash/shuffle'

export default function generateRandomQuestion(state) {
  const cards = getCards(state)
  if(cards.length > 0) {
    const { text } = sample(getCards(state))
    const card = state.textInfoById[text]
    const translation = card.translations[0]
    const otherTranslations = without(getTranslations(state), translation)
    const possibleAnswers = sampleSize(otherTranslations, 6)
            .concat(translation)
            .map((translation) => translation.text)
    return { text, possibleAnswers: shuffle(possibleAnswers) }
  }
  return null
}
