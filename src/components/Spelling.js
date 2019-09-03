import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpellingExercise from './SpellingExercise';
import UnsupportedBrowser from './UnsupportedBrowser';
import Loading from './Loading';
import Message from './Message';
import Diff from './Diff';
import { SpellingProvider } from '../providers';
import {
  GRADES,
  GRADE_APPROVED_MSG,
  GRADE_WARNING_MSG,
  GRADE_REJECTED_MSG,
  MESSAGE_SUCCESS,
  MESSAGE_DANGER,
  MESSAGE_WARNING,
} from '../constants';

const Spelling = () => {
  const { supported, speak } = useSpeechSynthesis();
  const [exercise, setExercise] = useState({});
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [grade, setGrade] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await SpellingProvider.fetchExercises({});
      setExercise(data);
      setLoading(false);
    };
    fetchApi();
  }, []);

  const gradeResult = async userInput => {
    setLoading(true);
    const result = await SpellingProvider.gradeExercise({
      ...exercise,
      userInput,
    });
    setGrade({ ...result, text: exercise.text });
    if (result.grade === GRADES.APPROVED) {
      setMsg({ text: GRADE_APPROVED_MSG, type: MESSAGE_SUCCESS });
    } else if (result.grade === GRADES.WARNING) {
      setMsg({ text: GRADE_WARNING_MSG, type: MESSAGE_WARNING });
    } else if (result.grade === GRADES.REJECTED) {
      setMsg({ text: GRADE_REJECTED_MSG, type: MESSAGE_DANGER });
    }

    setExercise(result.next);
    setLoading(false);
  };

  if (!supported) {
    return <UnsupportedBrowser />;
  }

  return (
    <div>
      {msg && <Message msg={msg.text} type={msg.type} />}
      <Diff grade={grade} />
      {loading ? (
        <Loading />
      ) : (
        <SpellingExercise
          text={exercise.text || ''}
          speak={speak}
          gradeResult={gradeResult}
        />
      )}
    </div>
  );
};

export default Spelling;
