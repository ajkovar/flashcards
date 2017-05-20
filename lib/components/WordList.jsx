import React from 'react'
import {List, ListItem} from 'material-ui/List'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import ClearIcon from 'material-ui/svg-icons/content/clear'

class WordList extends React.Component {
  constructor(props) {
    super(props)
  }

  handleDelete(word) {
    this.props.removeWord(word)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.words !== nextProps.words
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
    return <List>{words}</List>
  }
}

export default WordList
