import { connect } from 'react-redux'
import { addWord } from '../actions'
import App from '../components/App.jsx'

const mapStateToProps = (state) => state

const AppContainer = connect(
  mapStateToProps,
  { addWord }
)(App)

export default AppContainer
