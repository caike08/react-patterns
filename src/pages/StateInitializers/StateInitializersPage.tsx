/* State Initializer Pattern
 *
 * The State Initializer pattern is a technique used to reset the state of a component to its initial value.
 * This pattern is useful when you need to reset the state of a component to its initial value,
 * such as when a user clicks a "reset" button or when a component is unmounted and remounted.
 * 
 * Reference: https://kentcdodds.com/blog/the-state-initializer-pattern
 */
import React, { Component, ReactNode } from 'react'
import Switch from '../../components/Switch/Switch'

// A generic utility function that calls all provided functions with the given arguments.
const callAllFunctions = <Args extends unknown[]>(
  ...fns: Array<((...args: Args) => unknown) | undefined>
) => (...args: Args) => {
  fns.forEach(fn => fn && fn(...args))
}

/**
 * The shape of the helper object passed to children.
 */
type ToggleChildrenProps = {
  on: boolean
  toggle: () => void
  reset: () => void
  getTogglerProps: <T extends Record<string, unknown>>(
    props: T & { onClick?: (...args: unknown[]) => unknown }
  ) => T & { onClick: (...args: unknown[]) => void } & { 'aria-pressed': boolean }
}

/**
 * The props for the Toggle component.
 */
interface ToggleProps {
  initialOn: boolean
  onToggle: (on: boolean) => void
  onReset: (on: boolean) => void
  children: (props: ToggleChildrenProps) => ReactNode
}

/**
 * The Toggle component manages the state of a toggle switch and provides helper functions to its children.
 * It uses the state initializer pattern to reset the state to its initial value.
 */
class Toggle extends Component<ToggleProps, { on: boolean }> {
  // Default props.
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
  }

  // Save the initial state based on the initialOn prop.
  initialState = {
    on: this.props.initialOn,
  }

  // Component state.
  state = this.initialState

  // Resets the state to the initial state and then calls the onReset callback.
  reset = () => {
    this.setState(this.initialState, () => {
      this.props.onReset(this.state.on)
    })
  }

  // Toggles the state and then calls the onToggle callback.
  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  }

  componentDidUpdate(): void {
    console.log('state', this.state)
  }

  /**
   * Merges additional props with the toggle functionality.
   * It wraps any onClick provided in the props so that it first calls that function and then toggles.
   */
  getTogglerProps = <T extends Record<string, unknown>>(
    props: T & { onClick?: (...args: unknown[]) => unknown }
  ): T & { onClick: (...args: unknown[]) => void } & { 'aria-pressed': boolean } => ({
    ...props,
    onClick: callAllFunctions(props.onClick, this.toggle),
    'aria-pressed': this.state.on,
  })

  /**
   * Provides the current state and helper functions to the children.
   */
  getStateAndHelpers(): ToggleChildrenProps {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    }
  }

  // Renders the children with the state and helper functions.
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

/**
 * StateInitializers demonstrates the use of the state initializer pattern.
 * It renders a toggle switch that can be reset to its initial state.
 */
const StateInitializers: React.FC = () => {
  const initialOn = true
  const onToggle = (on: boolean) => console.log('on toggle', on)
  const onReset = (on: boolean) => console.log('on reset', on)

  return (
    <Toggle initialOn={initialOn} onToggle={onToggle} onReset={onReset}>
      {({ on, reset, getTogglerProps }) => (
        <>
          <h1 className='text-2xl font-bold text-gray-700 mb-4'>
            State Initializers Pattern
          </h1>
          {/* Pass on separately, and do not include it in getTogglerProps */}
          <Switch on={on} {...getTogglerProps({})} />
          <button
            aria-label='custom-button'
            className='bg-gray-200 p-2 rounded hover:bg-gray-300 px-4 py-2 mt-4'
            onClick={reset}
          >
            Reset toggle
          </button>
          <p className='text-xs font-medium mt-4'>
            Check your console to see the extra data :)
          </p>
        </>
      )}
    </Toggle>
  )
}

export default StateInitializers
