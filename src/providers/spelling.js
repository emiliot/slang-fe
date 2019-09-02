import { API_URL, DEFAULT_OPTIONS } from './index'

const fetchExercises = async ({ level = 'easy' }) => {
  const url = `${API_URL}/spellings?level=${level}`
  const result = await fetch(url, DEFAULT_OPTIONS)
  return await result.json()
}

const gradeExercise = async (data) => {
  const url = `${API_URL}/spellings/grade`
  const result = await fetch(url, {
    ...DEFAULT_OPTIONS,
    method: 'POST',
    body: JSON.stringify(data)
  })
  return await result.json()
}

export {
  fetchExercises,
  gradeExercise,
}
