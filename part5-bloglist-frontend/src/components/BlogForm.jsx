import { useState } from "react"

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()

    addBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="blog-form-container">
      <form onSubmit={createBlog}>
        <div>
          Title: <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          Author: <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          Url: <input value={url} onChange={handleUrlChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
)}

export default BlogForm
