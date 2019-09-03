import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpellInput from './SpellInput';
import SpellLetters from './SpellLetters';
import { shuffleArray } from '../utils/shuffle';

const SpellingExercise = ({ text, speak, gradeResult }) => {
  const [userInput, setUserInput] = useState([]);
  const [letters, setLetters] = useState([]);

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
      <div>
        <SpellInput text={text} userInput={userInput} />
        <button onClick={() => speak({ text })}>Listen</button>
        {userInput.length > 0 && (
          <button onClick={() => removeLastLetter()}>Delete</button>
        )}
        {userInput.length === text.length && (
          <button
            onClick={() =>
              gradeResult(
                userInput.reduce((value, next) => `${value}${next.letter}`, ''),
              )
            }
          >
            Grade
          </button>
        )}
      </div>
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
