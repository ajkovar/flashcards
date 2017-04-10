import React from 'react'
import ReactDOM from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import WordInput from './WordInput.jsx'
import Card from './Card.jsx'
import CSSModules from 'react-css-modules';
import styles from './App.css'
import sample from 'lodash/sample'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
        currentWord: sample(this.props.words)
    }
  }

  handleSubmit(word) {
    this.props.addWord(word)
  }

  render() {
    const words = this.props.words.map((word, i) => {
      return <li key={i}>{word}</li>
    })
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
                 title='Flash Cards'
                 iconClassNameRight='muidocs-icon-navigation-expand-more'
          />
          <div styleName='container'>
            <h1>Current Card</h1>
            <div styleName='card-container'>
              <Card word={this.state.currentWord} />
            </div>
            <WordInput handleSubmit={this.handleSubmit}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default CSSModules(App, styles)
