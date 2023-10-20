import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(vote(anecdote.id))
    dispatch(changeNotification(`Added your vote for: '${anecdote.content}'`, 5000))
  }
  return (
    <div className='anecdote' key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>Vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === 'ALL' ) {
      return anecdotes
    }

    const regex = new RegExp(filter, 'i')
    return anecdotes.filter(anecdote => anecdote.content.match(regex))
  })

  return (
    <div className='anecdote-container'>
      {anecdotes.sort((a, b) => b.votes - a.votes).map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
