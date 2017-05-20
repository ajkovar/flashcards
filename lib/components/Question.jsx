import React from 'react'
import Paper from 'material-ui/Paper'
import CSSModules from 'react-css-modules';
import styles from './Card.css'
import Card from './Card.jsx'

class Question extends React.Component {
  render() {
    const { text, possibleAnswers } = this.props.currentQuestion
    console.log('here')
    return (
      <div>
        <h1>Current Card</h1>
        <Card word={text}/>
        {(possibleAnswers || []).map((a, i) => {
          <div key={i}>{a}</div>
         })}
      </div>
    )
  }
}

export default CSSModules(Question, styles)
