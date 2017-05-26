import React from 'react'
import CSSModules from 'react-css-modules';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import styles from './WordList.css'
import {List, ListItem} from 'material-ui/List'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class WordList extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDelete(word) {
    this.props.removeWord(word)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.words !== nextProps.words ||
      this.props.cardListVisible != nextProps.cardListVisible
  }

  render() {
    const words = this.props.words.map((word, i) => {
      const translationsString = word.translations.map(t => t.text).join(',')
      return (
        <ListItem key={i} disabled={true}>
          <FlatButton
            primary={true}
            icon={<ClearIcon/>}
            onClick={() => this.handleDelete(word.text)}
          />
          {`${word.text} - ${translationsString}`}
        </ListItem>
      )
    })
    return <List styleName="container">{words}</List>
  }
}

export default CSSModules(WordList, styles)
