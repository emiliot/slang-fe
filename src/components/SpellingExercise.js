import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BackspaceOutlined from '@material-ui/icons/BackspaceOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import HeadsetOutlinedIcon from '@material-ui/icons/HeadsetOutlined';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SpellInput from './SpellInput';
import SpellLetters from './SpellLetters';
import { shuffleArray } from '../utils/shuffle';

const useStyles = makeStyles({
  root: {
    marginTop: '3vh',
    marginBottom: '3vh',
  },
});

const SpellingExercise = ({ text, speak, gradeResult }) => {
  const [userInput, setUserInput] = useState([]);
  const [letters, setLetters] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    let shuffled = text;
    while (shuffled === text) {
      shuffled = shuffleArray(shuffled.split('')).join('');
    }
    const shuffledArray = shuffled.split('');
    setLetters(
      shuffledArray.map(letter => ({
        letter,
        used: false,
      })),
    );
  }, [text]);

  const flipUsedLetter = index => {
    const current = letters[index];
    setLetters([
      ...letters.slice(0, index),
      { ...current, used: !current.used },
      ...letters.slice(index + 1),
    ]);
  };

  const updateInput = (index, letter) => {
    flipUsedLetter(index);
    setUserInput([...userInput, { letter, index }]);
  };

  const removeLastLetter = () => {
    const lastElement = userInput.slice(-1)[0];
    if (lastElement) {
      flipUsedLetter(lastElement.index);
    }
    setUserInput(userInput.slice(0, -1));
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <ButtonGroup>
          <Button
            variant='contained'
            color='primary'
            onClick={() => speak({ text })}
          >
            <HeadsetOutlinedIcon />
          </Button>
          <Button
            variant='contained'
            disabled={userInput.length <= 0}
            onClick={() => removeLastLetter()}
          >
            <BackspaceOutlined />
          </Button>
          <Button
            variant='contained'
            color='secondary'
            disabled={userInput.length !== text.length}
            onClick={() =>
              gradeResult(
                userInput.reduce((value, next) => `${value}${next.letter}`, ''),
              )
            }
          >
            <SendOutlinedIcon />
          </Button>
        </ButtonGroup>
      </div>
      <SpellInput text={text} userInput={userInput} />
      <SpellLetters letters={letters} updateInput={updateInput} />
    </Fragment>
  );
};

SpellingExercise.propTypes = {
  text: PropTypes.string.isRequired,
  speak: PropTypes.func.isRequired,
  gradeResult: PropTypes.func.isRequired,
};

export default SpellingExercise;
