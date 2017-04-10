import React from 'react'
import ReactDOM from 'react'
import { ENTER_KEY } from '../constants/keycodes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

class WordInput extends React.Component {
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
    this.refs.wordInput.focus();
  }

  componentDidUpdate(prevProps) {
    this.refs.wordInput.focus();
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
    }
    this.setState({
      word: '',
      wordInputBlank: this.state.word === ''
    })
    this.refs.wordInput.focus();
  }

  render() {
    return (
      <div>
        <TextField
               ref="wordInput"
               value={this.state.word}
               onKeyDown={this.handleKeyDown}
               onChange={this.handleChange}
               hintText="E.g. Salir, Hola, Mesa, etc."
               floatingLabelText="Add a word"
               floatingLabelFixed={true}
               errorText={this.state.wordInputBlank ? 'Enter a word to add' : undefined}
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

export default WordInput
