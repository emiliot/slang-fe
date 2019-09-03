import React from 'react';
import PropTypes from 'prop-types';

const SpellLetters = ({ letters, updateInput }) => {
  return (
    <div>
      {letters.map(({ letter, used }, index) => {
        return (
          <span
            key={index}
            style={{ color: used ? 'red' : 'blue' }}
            onClick={() => {
              if (!used) {
                updateInput(index, letter);
              }
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

SpellLetters.propTypes = {
  updateInput: PropTypes.func.isRequired,
  letters: PropTypes.array.isRequired,
};

export default SpellLetters;
