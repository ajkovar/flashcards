import React from 'react'
import Paper from 'material-ui/Paper'
import CSSModules from 'react-css-modules';
import styles from './Card.css'

class Card extends React.Component {
  render() {
    return (
      <div styleName='container'>
        <Paper styleName='card' zDepth={2}>
          <header>{this.props.word}</header>
        </Paper>
      </div>
    )
  }
}

export default CSSModules(Card, styles)
