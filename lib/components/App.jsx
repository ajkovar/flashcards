import React from 'react'
import ReactDOM from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import WordInput from './WordInput.jsx'
import WordList from './WordList.jsx'
import Question from './Question.jsx'
import CSSModules from 'react-css-modules';
import styles from './App.css'
import sample from 'lodash/sample'
import { ToastContainer, ToastMessage } from "react-toastr"
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.addWord = this.addWord.bind(this)
    this.removeWord = this.removeWord.bind(this)
  }

  removeWord(word) {
    const toastMessage = <div>
      {`${word} has been removed from your deck`}
      <FlatButton fullWidth={true} label="Undo" onClick={() => this.props.addWord(word)} />
    </div>
    this.addToast(toastMessage)
    this.props.removeWord(word)
  }

  addWord(word) {
    const toastMessage = <div>
      {`${word} has been added to your deck`}
      <FlatButton fullWidth={true} label="Undo" onClick={() => this.props.removeWord(word)} />
    </div>
    this.addToast(toastMessage)
    this.props.addWord(word)
  }

  addToast(message) {
    this.refs.container.info(undefined, message, {timeOut: 5000})
  }

  render() {
    const question = (
      <Question
        selectAnswer={this.props.selectAnswer}
        currentQuestion={this.props.currentQuestion} />
    )
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
                 title='Flash Cards'
                 iconClassNameRight='muidocs-icon-navigation-expand-more'
          />
          <div styleName='container'>
            { this.props.currentQuestion ? question : ''}
            <Divider style={{ marginTop: 20 }}/>
            <WordInput
              handleSubmit={this.addWord}
              fetchTranslations={this.props.fetchTranslations}
              selectTranslation={this.props.selectTranslation}
              addTranslation={this.props.addTranslation}
              textInfoById={this.props.textInfoById}/>
            <div styleName="expand-cards">
              <a href="javascript:;" onClick={this.props.toggleCardList}>View all cards in deck</a>
            </div>

            <div styleName="list-container">
              <CSSTransitionGroup
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                transitionName={ {
                  enter: styles.enter,
                  leave: styles.leave,
                } }>
                {this.props.cardListVisible ?
                  <WordList key={1} words={this.props.cards} removeWord={this.removeWord}/> :
                  ''}
              </CSSTransitionGroup>
            </div>

            <ToastContainer ref="container"
              toastMessageFactory={ToastMessageFactory}
              className="toast-bottom-right" />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default CSSModules(App, styles)
