/* eslint-disable @typescript-eslint/no-explicit-any */
// State Initializer Pattern
// Reference: https://kentcdodds.com/blog/the-state-initializer-pattern
import React, { ReactNode } from 'react'
import Switch from '../../components/Switch/Switch'

// runs all functions. First prop is the array of functions. Second prop are the arguments of those functions
const callAllFunctions = (...fns: ((...args: any) => any)[]) => (...args: any[]) => {
  fns.forEach(fn => fn && fn(...args))
}

interface ToggleProps {
  initialOn: boolean
  on: boolean
  title: string
  onReset: (args: boolean) => void
  onToggle: (args: boolean) => void
  children:
    (props: {on: boolean, toggle: () => void, reset: () => void, getTogglerProps: (props: any) => any }) => ReactNode
}

// Now let's make this as a Class component instead of functional
class Toggle extends React.Component<ToggleProps> {
  // default values for these props
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
  }

  // initial state for initialOn
  initialState = {
    on: this.props.initialOn,
  }

  // state 
  state = this.initialState

  // here resets set initial state, plus calls a function that toggles the on prop to onReset
  reset = () => {
    this.setState(
      this.initialState,
      () => { this.props.onReset(this.state.on)}
    )
  }

  // toggles the on prop
  toggle = () => {
    this.setState(
      ({ on }: ToggleProps) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  }

  componentDidUpdate(): void {
    console.log('state', this.state)
  }

  // call all functions inside onClick & pass other props
  getTogglerProps = ({ onClick, ...props }: any) => ({
    onClick: callAllFunctions(onClick, this.toggle),
    'aria-pressed': this.state.on,
    ...props
  })

  // returns the state and helpers - getter pattern
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    }
  }

  // render children with getStateAndHelpers()
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

const StateInitializers = (props: any) => {
  const initialOn = true
  const onToggle = (...args: any) => console.log('on toggle', ...args)
  const onReset = (...args: any) => console.log('on reset', ...args)

  return (
    <Toggle
      initialOn={initialOn}
      onToggle={onToggle}
      onReset={onReset}
      {...props}
    >
      {({ on, reset, getTogglerProps }) => ( // these props are passed as children
        <>
          <h1 className='text-2xl font-bold text-gray-700 mb-4'>State Initializers Pattern</h1>
          <Switch {...getTogglerProps({ on })} />
          <button
            aria-label='custom-button'
            className='bg-gray-200 p-2 rounded hover:bg-gray-300 px-4 py-2 mt-4'
            onClick={reset}
          >
            Reset toggle
          </button>
          <p className='text-xs font-medium mt-4'>Check your console to see the extra data :) </p>
        </>
      )}
    </Toggle>
  )
}

export default StateInitializers
