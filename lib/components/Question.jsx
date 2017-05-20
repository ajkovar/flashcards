import React from 'react'
import Paper from 'material-ui/Paper'
import CSSModules from 'react-css-modules';
import styles from './Question.css'
import Card from './Card.jsx'

class Question extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.currentQuestion !== nextProps.currentQuestion
  }
  getSelectAnswerFn(answer) {
    const { text } = this.props.currentQuestion
    return () => this.props.selectAnswer(text, answer)
  }
  render() {
    const { text, possibleAnswers, isCorrect, isAnswered } = this.props.currentQuestion
    return (
      <div>
        <h1>Current Card</h1>
        <Card word={text}/>
        <h4>Choose an answer</h4>
        <div styleName="answer-container">
          {(possibleAnswers || []).map((a, i) => {
            return <div styleName="answer" onClick={this.getSelectAnswerFn(a)} key={i}>{a}</div>
           })}
        </div>
        {isAnswered ? <div>{isCorrect ? 'Correct!' : 'Wrong!'}</div> : ''}
      </div>
    )
  }
}

export default CSSModules(Question, styles)
