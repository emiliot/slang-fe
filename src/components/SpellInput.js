import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3vh',
  },
  char: {
    margin: '0 1vw',
  },
});

const SpellInput = ({ text, userInput }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {text.split('').map((_, index) => {
        const output = index < userInput.length ? userInput[index].letter : '_';
        return (
          <span key={index} className={classes.char}>
            <Typography variant='body1'>{output}</Typography>
          </span>
        );
      })}
    </div>
  );
};

SpellInput.propTypes = {
  text: PropTypes.string.isRequired,
  userInput: PropTypes.array.isRequired,
};

export default SpellInput;
