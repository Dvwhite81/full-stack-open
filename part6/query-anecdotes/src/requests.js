import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const vote = (anecdote) => {
  const updatedVote = { ...anecdote, votes: anecdote.votes + 1 }
  return axios.put(`${baseUrl}/${anecdote.id}`, updatedVote).then(res => res.data)
}
