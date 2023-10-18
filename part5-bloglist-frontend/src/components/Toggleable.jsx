import { useState } from 'react'

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)

    if (props.type === 'display') {
      const display =
        props.containerDisplay === 'one-column' ? 'two-columns' : 'one-column'
      props.setContainerDisplay(display)
    }
  }

  return (
    <div className={props.divClass}>
      <div style={hideWhenVisible}>
        <button className={props.buttonClass} onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className={props.buttonClass} onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  )
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
