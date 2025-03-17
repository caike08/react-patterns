/* High Order Components (HOC) pattern
 *
 * The High Order Component (HOC) pattern is a React technique for reusing component logic.
 * It works by taking a component and returning a new, enhanced component that injects additional props or behavior.
 * In this implementation, the hocConstructor function wraps a component (e.g., ClickIncrease or HoverIncrease)
 * and provides extra props such as a default title and an optional extraText. This allows multiple components to share
 * a consistent presentation or behavior without duplicating code.
 *
 * Reference: https://blog.logrocket.com/understanding-react-higher-order-components/
 */

import React, { FC, useState } from 'react'

/**
 * Interface for the props that are injected by the HOC.
 */
interface WithCounterProps {
  title?: string
  extraText?: string
}

/**
 * ClickIncrease component increases its local count state when the button is clicked.
 */
const ClickIncrease: FC<WithCounterProps> = ({ title, extraText }) => {
  const [count, setCount] = useState(0)

  return (
    <div className='flex gap-4 items-center justify-center flex-col bg-gray-100 rounded-md p-4 shadow mb-4'>
      {title && <h5 className='text-lg font-bold text-center text-gray-700'>{title}</h5>}
      <p className='text-md font-bold text-center text-gray-700'>
        Click count: {count}
      </p>
      <button
        className='bg-green-400 rounded hover:bg-green-500 px-4 py-2'
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
      {extraText && <small className='text-xs font-medium mt-4'>{extraText}</small>}
    </div>
  )
}

/**
 * HoverIncrease component increases its local count state when the button is hovered over.
 */
const HoverIncrease: FC<WithCounterProps> = ({ title, extraText }) => {
  const [count, setCount] = useState(0)

  return (
    <div className='flex gap-4 items-center justify-center flex-col bg-gray-100 rounded-md p-4 shadow mb-4'>
      {title && <h5 className='text-lg font-bold text-center text-gray-700'>{title}</h5>}
      <p className='text-md font-bold text-center text-gray-700'>
        Hover count: {count}
      </p>
      <button
        className='bg-green-400 rounded hover:bg-green-500 px-4 py-2'
        onMouseOver={() => setCount(count + 1)}
      >
        Hover me
      </button>
      {extraText && <small className='text-xs font-medium mt-4'>{extraText}</small>}
    </div>
  )
}

/**
 * Higher-Order Component constructor (HOC) that wraps a component and injects common props.
 * It takes an OriginalComponent and an optional extraText, and returns a new component
 * that automatically passes a default title and extraText to the wrapped component.
 */
function hocConstructor<P>(
  OriginalComponent: React.ComponentType<P & WithCounterProps>,
  extraText?: string
): React.FC<P> {
  const NewComponent: React.FC<P> = (props: P) => {
    // common props injected by the HOC
    const extraProps: WithCounterProps = {
      title: 'This title came as extra props in hocConstructor',
    }
    return <OriginalComponent {...props} {...extraProps} extraText={extraText} />
  }

  NewComponent.displayName = `withCounter(${
    OriginalComponent.displayName || OriginalComponent.name
  })`

  return NewComponent
}

/**
 * HighOrderComponentPage demonstrates the HOC pattern.
 * It creates two enhanced components using hocConstructor: one for click events and one for hover events.
 */
const HighOrderComponentPage: FC = () => {
  // Extra text is provided only for the ClickIncrease component.
  const CLICK_COMPONENT_EXTRA_TEXT = 'Extra text passed only for this component'

  // Build the enhanced components using the HOC.
  const ClickComponent = hocConstructor(ClickIncrease, CLICK_COMPONENT_EXTRA_TEXT)
  const HoverComponent = hocConstructor(HoverIncrease)

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold mb-4'>High Order Components (HOC) pattern</h1>
      <ClickComponent />
      <HoverComponent />
    </div>
  )
}

export default HighOrderComponentPage
