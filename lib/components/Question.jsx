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
    const {
      text, possibleAnswers, isCorrect, isAnswered, correctAnswers
    } = this.props.currentQuestion
    const correctAnswersString = (correctAnswers || []).join(' or ')
    const result = isCorrect ?
      <div styleName='correct-result'>Correct!</div> :
      <div styleName='incorrect-result'>Incorrect! The correct answer was {correctAnswersString}</div>
    const answers = (possibleAnswers || []).map((a, i) => {
      const style = correctAnswers ?
        (correctAnswers.indexOf(a) > -1 ? 'answer' : 'wrong-answer') :
        'answer'
      return <div styleName={style} onClick={this.getSelectAnswerFn(a)} key={i}>{a}</div>
    })
    return (
      <div>
        <h1>Current Card</h1>
        <Card word={text}/>
        <h4>Choose an answer</h4>
        <div styleName="answer-container">{answers}</div>
        {isAnswered ? result : ''}
      </div>
    )
  }
}

export default CSSModules(Question, styles)
