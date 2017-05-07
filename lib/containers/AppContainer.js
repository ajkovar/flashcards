import { connect } from 'react-redux'
import { addWord, removeWord, fetchTranslations, selectTranslation } from '../actions'
import App from '../components/App.jsx'

const mapStateToProps = (state) => state

const AppContainer = connect(
  mapStateToProps,
  { fetchTranslations, addWord, removeWord, selectTranslation }
)(App)

export default AppContainer
