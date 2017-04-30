import React from 'react'
import ReactDOM from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import WordInput from './WordInput.jsx'
import WordList from './WordList.jsx'
import Card from './Card.jsx'
import CSSModules from 'react-css-modules';
import styles from './App.css'
import sample from 'lodash/sample'
import { ToastContainer, ToastMessage } from "react-toastr"
import FlatButton from 'material-ui/FlatButton'

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.addWord = this.addWord.bind(this)
    this.removeWord = this.removeWord.bind(this)
    this.state = {
      currentWord: sample(this.props.words)
    }
  }

  removeWord(word) {
    const toastMessage = <div>
      {`${word} has been removed from your deck. `}
      <FlatButton fullWidth={true} label="Undo" onClick={() => this.props.addWord(word)} />
    </div>
    this.refs.container.info(
      undefined,
      toastMessage, {
      timeOut: 5000
    })
    this.props.removeWord(word)
  }

  addWord(word) {
    const toastMessage = <div>
      {`${word} has been added to your deck`}
      <FlatButton fullWidth={true} label="Undo" onClick={() => this.props.removeWord(word)} />
    </div>
    this.refs.container.info(
      undefined,
      toastMessage, {
      timeOut: 5000
    })
    this.props.addWord(word)
  }

  render() {
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
            <WordInput handleSubmit={this.addWord}/>
            <WordList words={this.props.words} removeWord={this.removeWord}/>
          </div>
          <ToastContainer ref="container"
            toastMessageFactory={ToastMessageFactory}
            className="toast-bottom-right" />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default CSSModules(App, styles)
