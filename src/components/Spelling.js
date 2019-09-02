import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpellingExercise from './SpellingExercise'
import UnsupportedBrowser from './UnsupportedBrowser'
import Loading from './Loading'
import { SpellingProvider } from '../providers'

const Speech = () => {
  const { supported, speak } = useSpeechSynthesis()
  const [exercises, setExercises] = useState([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchApi = async () => {
      const data = await SpellingProvider.fetchExercises({})
      setExercises(data)
      setCurrent(0)
      setLoading(false)
    }
    fetchApi()
  }, [])

  if (!supported) {
    return <UnsupportedBrowser />
  }

  const exercise = exercises[current] || ''
  return (
    <div>
      {loading ?
        <Loading /> :
        <SpellingExercise text={exercise} speak={speak} />
      }
    </div>
  )
}

export default Speech