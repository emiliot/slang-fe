import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';

const SpellLetters = ({ letters, updateInput }) => {
  return (
    <ButtonGroup size='small'>
      {letters.map(({ letter, used }, index) => {
        const title = !used ? 'Add to the spelling' : '';
        return (
          <Tooltip key={index} title={title}>
            <Button
              disabled={used}
              onClick={() => {
                if (!used) {
                  updateInput(index, letter);
                }
              }}
            >
              {letter}
            </Button>
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
};

SpellLetters.propTypes = {
  updateInput: PropTypes.func.isRequired,
  letters: PropTypes.array.isRequired,
};

export default SpellLetters;
