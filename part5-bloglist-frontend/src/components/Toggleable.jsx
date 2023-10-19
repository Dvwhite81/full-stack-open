import React, { useImperativeHandle, useState } from 'react'

const Toggleable = ((props, refs) => {
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

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

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
          Hide
        </button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default React.forwardRef(Toggleable)
