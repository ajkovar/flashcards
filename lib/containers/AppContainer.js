import { connect } from 'react-redux'
import { addWord, removeWord, fetchTranslations, selectTranslation, addTranslation } from '../actions'
import App from '../components/App.jsx'
import { getCards } from '../selectors'

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    cards: getCards(state)
  })
}

const AppContainer = connect(
  mapStateToProps,
  { fetchTranslations, addWord, removeWord, selectTranslation, addTranslation }
)(App)

export default AppContainer
