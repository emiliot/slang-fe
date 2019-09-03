import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpellingExercise from './SpellingExercise'
import UnsupportedBrowser from './UnsupportedBrowser'
import Loading from './Loading'
import Message from './Message'
import { SpellingProvider } from '../providers'
import { GRADES, SPELLING_LEVELS, GRADE_APPROVED_MSG, GRADE_WARNING_MSG, GRADE_REJECTED_MSG } from '../constants'

const Speech = () => {
  const { supported, speak } = useSpeechSynthesis()
  const [exercise, setExercise] = useState({})
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState(null)
  
  useEffect(() => {
    const fetchApi = async () => {
      const data = await SpellingProvider.fetchExercises({})
      setExercise(data)
      setCurrent(0)
      setLoading(false)
    }
    fetchApi()
  }, [])

  const gradeResult = async (userInput) => {
    setLoading(true)
    const result = await SpellingProvider.gradeExercise({...exercise,  userInput})
    setExercise(result.next)
    if (result.grades === GRADES.APPROVED) {
      setMsg(GRADE_APPROVED_MSG)
    } else if (result.grades === GRADES.WARNING) {
      setMsg(GRADE_WARNING_MSG)
    } else if (result.grades === GRADES.REJECTED) {
      setMsg(GRADE_REJECTED_MSG)
    }
    setLoading(false)
  }

  if (!supported) {
    return <UnsupportedBrowser />
  }

  return (
    <div>
      {msg && <Message msg={msg} />}
      {loading ?
        <Loading /> :
        <SpellingExercise text={exercise.text || ''} speak={speak} gradeResult={gradeResult} />
      }
    </div>
  )
}

export default Speech