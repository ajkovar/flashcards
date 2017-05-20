import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Card.css'
import Checkbox from 'material-ui/Checkbox'
import TranslationInput from './TranslationInput.jsx'

class TranslationEditor extends React.Component {
  constructor(props) {
    super(props)
    this.addTranslation = this.addTranslation.bind(this)
  }

  addTranslation(translation) {
    this.props.addTranslation(this.props.text, translation)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.translations !== nextProps.translations
  }

  render() {
    const translations = this.props.translations || []
    const translationComponents = translations.map((translation, i) => {
      return (
        <Checkbox key={i}
          label={translation.text}
          checked={translation.isSelected}
          onClick={() => this.props.selectTranslation(this.state.text, translation)}/>
      )
    })
    return (
      <div>
        { translations.length > 0 ? <h3>Translations:</h3> : '' }
        { translations.length > 0 ? translationComponents : ''}
        {
          translations.length == 0  ?
            <p>No translations found.  Maybe you'd to try adding one?</p> :
            ''
        }
        { translations.length === 0 ?
            <TranslationInput onSubmit={this.addTranslation}/> :
            ''
        }
      </div>
    )
  }
}

export default CSSModules(TranslationEditor, styles)
