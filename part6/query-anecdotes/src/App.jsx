import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, vote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: vote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
      )
      notificationDispatch({ type: 'VOTE', payload: updatedAnecdote.content })
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' })
      }, 5000)
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (!result.isSuccess) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
