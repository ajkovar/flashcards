import React from 'react'
import ReactDOM from 'react'
import { ENTER_KEY } from '../constants/keycodes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TranslationsEditor from './TranslationsEditor.jsx'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import without from 'lodash/without'
import Divider from 'material-ui/Divider';
// import debounce from 'lodash/debounce'

class WordInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.fetchTranslations = debounce(this.fetchTranslations.bind(this), 500)
    this.submit = this.submit.bind(this)
    this.state = {
      word: ''
    }
  }

  componentDidMount(prevProps) {
    this.refs.wordInput.focus()
  }

  componentDidUpdate(prevProps) {
    this.refs.wordInput.focus()
  }

  handleChange(event) {
    const word = event.target.value
    const textInfo = this.props.textInfoById[word]
    if(word !== '' && !textInfo) {
      this.props.fetchTranslations(word)
    }
    this.setState({word});
  }

  // fetchTranslations(word) {
  //   this.props.fetchTranslations(word)
  // }

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
    this.refs.wordInput.focus()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const textInfo = this.props.textInfoById[this.state.word] || {}
    const nextTextInfo = nextProps.textInfoById[nextState.word] || {}
    return this.state.word !== nextState.word || textInfo!== nextTextInfo
  }

  render() {
    const textInfo = this.props.textInfoById[this.state.word] || {}
    const translations = textInfo.translations || []
    const translationEditor = this.state.word !== '' && !textInfo.isFetching ? (
      <TranslationsEditor
        translations={translations}
        text={this.state.word}
        addTranslation={this.props.addTranslation}/>
    ) : null
    const addCardButton = <RaisedButton label="Save Card" primary={true} onTouchTap={this.submit}/>
    return (
      <div>
        <TextField
               ref="wordInput"
               value={this.state.word}
               onKeyDown={this.handleKeyDown}
               onChange={this.handleChange}
               hintText="E.g. Salir, Hola, Mesa, etc."
               floatingLabelText="Add a card"
               floatingLabelFixed={true}
               errorText={this.state.wordInputBlank ? 'Enter a word to add' : undefined}
        />
        { translationEditor }
        { textInfo.isFetching ? <div>Fetching translations..</div> : '' }
        <br/>
        { translations.length > 0 ? addCardButton: '' }
      </div>
    )
  }
}

export default WordInput
