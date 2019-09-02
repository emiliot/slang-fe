import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpellingExercise from './SpellingExercise'
import { UNSUPPORTED_BROWSER } from '../constants';

const Speech = () => {
  const { speak, supported } = useSpeechSynthesis()
  // TODO: fetch word from BE
  // TODO: pass the word from BE to SPELLING EXERCISE

  return (
    <div>
      {supported ? <SpellingExercise text='todo' speak={speak} /> : <strong>{UNSUPPORTED_BROWSER}</strong>}
    </div>
  )
}

export default Speech