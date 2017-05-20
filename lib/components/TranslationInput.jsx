import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { ENTER_KEY } from '../constants/keycodes'

class TranslationInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {}
  }

  handleKeyDown(event) {
    if (event.which === ENTER_KEY) {
      this.props.submit()
    }
  }

  handleChange(event) {
    const word = event.target.value
    this.setState({word});
  }

  handleSubmit() {
    this.props.onSubmit(this.state.word)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.word !== nextState.word
  }

  render(){
    return (
      <div>
        <TextField
          ref="translationInput"
          value={this.props.word}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          hintText="E.g. Leave, Hello, Table, etc."
          floatingLabelText="Add a translation"
          floatingLabelFixed={true}
        />
        <FlatButton label="Add" primary={true} onTouchTap={this.handleSubmit}/>
      </div>
    )
  }
}

export default TranslationInput
