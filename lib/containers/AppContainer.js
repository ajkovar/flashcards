import { connect } from 'react-redux'
import { addWord, removeWord, fetchTranslations, selectTranslation, addTranslation } from '../actions'
import App from '../components/App.jsx'

const mapStateToProps = (state) => state

const AppContainer = connect(
  mapStateToProps,
  { fetchTranslations, addWord, removeWord, selectTranslation, addTranslation }
)(App)

export default AppContainer
