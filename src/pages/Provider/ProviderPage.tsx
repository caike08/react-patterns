/* Provider Pattern Page
 *
 * The Provider Pattern leverages React's Context API to pass state and behavior deep into the component tree 
 * without the need for prop drilling. In this implementation, a class-based Toggle component manages an internal 
 * boolean state ("on") and exposes a toggle function via a context provider. Child components nested anywhere within 
 * the provider can consume this context to access the current state and invoke the toggle function. This encapsulates 
 * state logic and behavior in one place, making it reusable and easier to manage across the application.
 * 
 * Reference: https://www.patterns.dev/posts/provider-pattern
 */

import { Component, FC, ReactNode, createContext } from 'react'
import Switch from '../../components/Switch/Switch'

/**
 * Interface for the context value that will be shared by the Provider.
 */
interface ToggleContextValue {
  on: boolean
  onToggle: () => void
}

/**
 * Create a ToggleContext with a default value.
 */
const ToggleContext = createContext<ToggleContextValue>({
  on: false,
  onToggle: () => {},
})

/**
 * Props for the Toggle component.
 * Note: We remove the 'on' prop because Toggle manages the state internally.
 */
interface ToggleProps {
  onToggle: (on: boolean) => void
  children?: ReactNode
}

/**
 * State for the Toggle component.
 */
interface ToggleState {
  on: boolean
}

/**
 * The Toggle component uses the Context Provider to supply the current 'on' state and a toggle function
 * to any nested components that consume the context. It maintains internal state and calls the external
 * onToggle callback whenever the state changes.
 */
class Toggle extends Component<ToggleProps, ToggleState> {
  // Expose the Consumer so that nested components can access the context.
  static Consumer = ToggleContext.Consumer

  // Initialize state.
  state: ToggleState = {
    on: false,
  }

  /**
   * Toggles the internal state and then calls the external onToggle callback with the new state.
   */
  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  }

  render() {
    const contextValue: ToggleContextValue = {
      on: this.state.on,
      onToggle: this.toggle,
    }

    console.log('state of "on" inside Toggle class:', this.state.on)

    // The Provider passes the context value (and any additional props) to its children.
    return (
      <ToggleContext.Provider value={contextValue} {...this.props} />
    )
  }
}

/**
 * Below are example layers consuming the Toggle context.
 */

const Layer1: FC = () => <Layer2 />

const Layer2: FC = () => (
  <Toggle.Consumer>
    {({ on }) => (
      <>
        <p className='text-sm mb-2'>
          Layer2: The toggle should be <strong>{on ? 'on' : 'off'}</strong>
        </p>
        <Layer3 />
      </>
    )}
  </Toggle.Consumer>
)

const Layer3: FC = () => <Layer4 />

const Layer4: FC = () => (
  <Toggle.Consumer>
    {({ on, onToggle }) => (
      <>
        <p className='text-sm mb-2'>
          Layer4: the variable 'on' is <strong>{on ? 'on' : 'off'}</strong>
        </p>
        <Switch on={on} onClick={onToggle} />
      </>
    )}
  </Toggle.Consumer>
)

/**
 * ProviderPage sets up the Toggle provider and renders nested components that consume the context.
 */
const ProviderPage: FC = (props) => {
  const onToggle = (on: boolean) =>
    console.log('ProviderPage on Toggle args:', on)

  return (
    <>
      <h1 className='text-2xl font-bold text-gray-700 mb-4'>Provider Pattern</h1>
      <Toggle onToggle={onToggle} {...props}>
        <Layer1 />
      </Toggle>
      <p className='text-xs font-medium mt-4'>
        Check your console to see the extra data :)
      </p>
    </>
  )
}

export default ProviderPage
