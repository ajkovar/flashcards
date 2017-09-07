import { getCards, getTranslations } from '../selectors';
import sampleSize from 'lodash/sampleSize';
import without from 'lodash/without';
import shuffle from 'lodash/shuffle';
import sortedIndex from 'lodash/sortedIndex';
import random from 'lodash/random';

function weightedSample(cards) {
  const cdf = cards.reduce((result, card, i) => {
    const previousWeight = result.length === 0 ? 0 : result[i - 1];
    const weight =
      (card.incorrectAnswers + 5 || 5) / (card.correctAnswers + 5 || 5);
    return result.concat(weight + previousWeight);
  }, []);

  const sum = cdf[cdf.length - 1];
  const index = sortedIndex(cdf, random(0, sum));
  return cards[index];
}

export default function generateRandomQuestion(state) {
  const cards = getCards(state);
  if (cards.length > 0) {
    const { text } = weightedSample(cards);
    const card = state.textInfoById[text];
    const translation = card.translations[0];
    const otherTranslations = without(getTranslations(state), translation);
    const possibleAnswers = sampleSize(otherTranslations, 9)
      .concat(translation)
      .map(translation => translation.text);
    return { text, possibleAnswers: shuffle(possibleAnswers) };
  }
  return null;
}
