/* eslint-disable @typescript-eslint/no-explicit-any */
// High Order Components (HOC) pattern
// Reference: https://blog.logrocket.com/understanding-react-higher-order-components/

import { useState } from 'react'

// Click button should increase local count state
function ClickIncrease (props: any) {
  const [ count, setCount ] = useState(0)

  return (
    <div className='flex gap-4 items-center justify-center flex-col bg-gray-100 rounded-md p-4 shadow mb-4'>
      {props.title && <h5 className='text-lg font-bold text-center text-gray-700'>{props.title}</h5>}

      <p className='text-md font-bold text-center text-gray-700'>
        Click count: {count}
      </p>

      <button
        className='bg-green-400 rounded hover:bg-green-500 px-4 py-2'
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>

      {props.extraText && <small className='text-xs font-medium mt-4'>{props.extraText}</small>}
    </div>
  )
}

// Hover button should increase local count state
function HoverIncrease (props: any) {
  const [ count, setCount ] = useState(0)

  return (
    <div className='flex gap-4 items-center justify-center flex-col bg-gray-100 rounded-md p-4 shadow mb-4'>
      {props.title && <h5 className='text-lg font-bold text-center text-gray-700'>{props.title}</h5>}

      <p className='text-md font-bold text-center text-gray-700'>
        Hover count: {count}
      </p>

      <button
        className='bg-green-400 rounded hover:bg-green-500 px-4 py-2'
        onMouseOver={() => setCount(count + 1)}
      >
        Hover me
      </button>

      {props.extraText && <small className='text-xs font-medium mt-4'>{props.extraText}</small>}
    </div>
  )
}

// If you want to share states between various React components,
// please use React’s Context API, which allows you to effortlessly share states and Hooks throughout your app.
const hocConstructor = (OriginalComponent: any, extraText?: string): any => {
  function NewComponent(props: any) {
    // common props I want to share with all components 
    const extraProps = {
      title: 'This title came as extra props in hocConstructor',
    }

    return (
      <OriginalComponent
        {...props}
        {...extraProps}
        extraText={extraText}
      />
    )
  }

  NewComponent.displayName = `withCounter(${OriginalComponent.displayName ||
    OriginalComponent.name})`

  return NewComponent
}

const HighOrderComponentPage = () => {
  // this value will be passed only to ClickIncrease component
  const CLICK_COMPONENT_EXTRA_TEXT = 'Extra text passed only for this component'

  // build the components
  const ClickComponent = hocConstructor(ClickIncrease, CLICK_COMPONENT_EXTRA_TEXT)
  const HoverComponent = hocConstructor(HoverIncrease)

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold mb-4'>High Order Components (HOC) pattern</h1>

      {<ClickComponent />}
      {<HoverComponent />}
    </div>
  )
}

export default HighOrderComponentPage
