import React from 'react'
import ReactDOM from 'react'
import { ENTER_KEY } from '../constants/keycodes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
      word: ''
    }
  }

  componentDidMount(prevProps) {
    this.refs.wordField.focus();
  }

  componentDidUpdate(prevProps) {
    this.refs.wordField.focus();
  }

  handleChange(event) {
    this.setState({word: event.target.value});
  }

  handleKeyDown(event) {
    if (event.which === ENTER_KEY) {
      this.submit()
    }
  }

  submit() {
    if(this.state.word !== '') {
      this.props.handleSubmit(this.state.word);
      this.state.word = ''
    }
    this.refs.wordField.focus();
  }

  render() {
    return (
      <div>
        <TextField
               ref="wordField"
               value={this.state.word}
               onKeyDown={this.handleKeyDown}
               onChange={this.handleChange}
               hintText="E.g. Salir, corer, mesa, etc."
               floatingLabelText="Add a Flash Card"
               floatingLabelFixed={true}
        />
        <FlatButton
               label="Add"
               primary={true}
               onTouchTap={this.submit}
        />
      </div>
    )
  }
}

export default App
