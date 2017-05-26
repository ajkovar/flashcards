import App from '../components/App.jsx'
import { connect } from 'react-redux'
import { addWord,
         removeWord,
         fetchTranslations,
         selectTranslation,
         addTranslation,
         selectAnswer,
         toggleCardList
       } from '../actions'
import { getCards } from '../selectors'

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    cards: getCards(state)
  })
}

const AppContainer = connect(
  mapStateToProps,
  { fetchTranslations, addWord, removeWord, selectTranslation,
    addTranslation, selectAnswer, toggleCardList
  }
)(App)

export default AppContainer
