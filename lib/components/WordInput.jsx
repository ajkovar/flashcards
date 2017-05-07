import React from 'react'
import ReactDOM from 'react'
import { ENTER_KEY } from '../constants/keycodes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'
import without from 'lodash/without'
import get from 'lodash/get'

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
    const word = event.target.value
    if(word !== '') {
      this.props.fetchTranslations(word)
    }
    this.setState({word});
  }

  handleKeyDown(event) {
    if (event.which === ENTER_KEY) {
      this.submit()
    }
  }

  submit() {
    if(this.state.word !== '') {
      this.props.handleSubmit(this.state.word)
    }
    this.setState({
      word: '',
      wordInputBlank: this.state.word === ''
    })
    this.refs.wordInput.focus();
  }

  render() {
    let textInfo = this.props.textInfoById[this.state.word] || {}
    let translations = (textInfo.translations || []).map((translation, i) => {
      return (
        <Checkbox key={i}
          label={translation.text}
          checked={translation.isSelected}
          onClick={() => this.props.selectTranslation(this.state.word, translation)}/>
      )
    })
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
        { textInfo.isFetching ? <div>Fetching translations..</div> : '' }
        { translations.length > 0 ? <div>The following translations were found:</div> : '' }
        { translations }
      </div>
    )
  }
}

export default WordInput
