import { createSelector } from 'reselect'

const getTextInfoById = (state) => state.textInfoById

export const getCards = createSelector(
  [ getTextInfoById ],
  (textInfoById) => {
    return Object.values(textInfoById).filter((card) => card.isSaved)
  }
)
