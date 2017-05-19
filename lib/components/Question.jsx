import React from 'react'
import Paper from 'material-ui/Paper'
import CSSModules from 'react-css-modules';
import styles from './Card.css'
import Card from './Card.jsx'

class Question extends React.Component {
  render() {
    const possibleAnswers = (this.props.possibleAnswers || []).map(a => <div>{a}</div>)
    return (
      <div>
        <h1>Current Card</h1>
        {this.props.currentCard ? <Card word={this.props.currentCard.text}/> : ''}
        {this.props.currentCard ? possibleAnswers : ''}
      </div>
    )
  }
}

export default CSSModules(Question, styles)
