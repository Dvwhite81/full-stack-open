import Toggleable from './Toggleable'

const Blog = (props) => (
  <div className='single-blog'>
    <div className='word-wrap'>
      <strong>{props.blog.title}</strong> by <em>{props.blog.author}</em>
    </div>
    <Toggleable
      type={'null'}
      divClass={'blog-view-container'}
      containerDisplay={props.containerDisplay}
      setContainerDisplay={props.setContainerDisplay}
      buttonClass={'toggle-blog-view-button'}
      buttonLabel="View"
    >
      <div className='blog-details'>
        <div className='word-wrap'>{props.blog.url}</div>
        <div className='likes-container'>
          {props.blog.likes}
          <button>Like</button>
        </div>

      </div>
    </Toggleable>
  </div>
)

export default Blog
