import React from 'react'
import Paper from 'material-ui/Paper'
import CSSModules from 'react-css-modules';
import styles from './Card.css'

import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ClearIcon from 'material-ui/svg-icons/content/clear';

class WordList extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDelete(word) {
    console.log(word)
    this.props.removeWord(word)
  }

  render() {
    const words = this.props.words.map((word, i) => {
      return (
        <ListItem key={i} disabled={true}>
          <FlatButton
            primary={true}
            icon={<ClearIcon/>}
            onClick={() => this.handleDelete(word)}
          />
          {word}
        </ListItem>
      )
    })
    return <List>{words}</List>
  }
}

export default CSSModules(WordList, styles)
