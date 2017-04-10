import React from 'react'
import ReactDOM from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import WordInput from './WordInput.jsx'
import CSSModules from 'react-css-modules';
import styles from './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
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
            <WordInput handleSubmit={this.handleSubmit}/>
            <ul>{words}</ul>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default CSSModules(App, styles)
