import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

const SpellingExercise = ({text, speak}) => {
  // TODO: show text in the UI
  return (
    <Fragment>
      <div>
        {text}
      </div>
      <div>
        <button onClick={() => speak({ text })}>
          Speak
        </button>
      </div>
    </Fragment>
  )
}

SpellingExercise.propTypes = {
  text: PropTypes.string.isRequired,
  speak: PropTypes.func.isRequired,
}

export default SpellingExercise