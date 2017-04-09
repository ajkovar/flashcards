import React from 'react'
import ReactDOM from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import WordInput from './WordInput.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      word: ''
    }
  }

  handleSubmit(word) {
    console.log(word)
    this.props.addWord(word)
  }

  render() {
    const words = this.props.words.map(word => <li>{word}</li>)
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
                 title="Flash Cards"
                 iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <WordInput word={this.state.word} handleSubmit={this.handleSubmit}/>
          <ul>{words}</ul>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
