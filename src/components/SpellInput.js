import React from 'react';
import PropTypes from 'prop-types';

const SpellInput = ({ text, userInput }) => {
  return (
    <div>
      {text.split('').map((_, index) => {
        const output = index < userInput.length ? userInput[index].letter : '_';
        return <span key={index}>{output}</span>;
      })}
    </div>
  );
};

SpellInput.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SpellInput;
