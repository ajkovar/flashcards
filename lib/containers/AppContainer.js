import { connect } from 'react-redux'
import { addWord, removeWord } from '../actions'
import App from '../components/App.jsx'

const mapStateToProps = (state) => state

const AppContainer = connect(
  mapStateToProps,
  { addWord, removeWord }
)(App)

export default AppContainer
