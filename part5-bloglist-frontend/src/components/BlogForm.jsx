const BlogForm = (props) => {
  return (
  <form onSubmit={props.addBlog}>
    <input
      value={props.newBlog}
      onChange={props.handleBlogChange}
    />
    <button type="submit">save</button>
  </form>
)}

export default BlogForm
