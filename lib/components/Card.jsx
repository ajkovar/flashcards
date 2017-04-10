import React from 'react'
import Paper from 'material-ui/Paper'
import CSSModules from 'react-css-modules';
import styles from './Card.css'

class App extends React.Component {
  render() {
    return (
      <Paper styleName='card' zDepth={1}>
        <header>{this.props.word}</header>
      </Paper>
    )
  }
}

export default CSSModules(App, styles)
