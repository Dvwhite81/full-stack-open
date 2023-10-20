import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div className='anecdote' key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>Vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
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
          handleClick={() => dispatch(vote(anecdote.id))}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
