/* eslint-disable @typescript-eslint/no-explicit-any */
// Provider Pattern Page
// Reference: https://www.patterns.dev/posts/provider-pattern
import { Component, ReactNode, createContext } from 'react'

import Switch from '../../components/Switch/Switch'

interface ToggleProps {
  on: boolean,
  onToggle: (args?: boolean) => void
  children?: ReactNode
}

const ToggleContext = createContext<ToggleProps>({
  on: false,
  onToggle: () => {},
})

// Let's use the context inside a class component
class Toggle extends Component<ToggleProps> {
  // static Consumer is a component which has access to the state of the context
  static Consumer = ToggleContext.Consumer

  state = {
    on: false,
  }

  toggle = () => {
    this.setState(
      ({ on }: ToggleProps) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  }

  render() {
    const contextValue = {
      on: this.state.on,
      onToggle: this.toggle,
    }

    console.log('state of "on" inside Toggle class:', this.state.on)

    return (
      // Passing the context value to the Toggle component
      <ToggleContext.Provider
        value={contextValue}
        {...this.props}
      />
    )
  }
}

// now let's play with how we can use the context

// Layer1 receives Layer2
const Layer1 = () => <Layer2 />

// Layer2 renders p and Layer3
const Layer2 = () => (
  <Toggle.Consumer>
    {({on}) => (
      <>
        <p className='text-sm mb-2'>Layer2: The toggle should be <strong>{on ? 'on' : 'off'}</strong></p>
        <Layer3 />
      </>
    )}
  </Toggle.Consumer>
)

// Layer3 receives Layer4
const Layer3 = () => <Layer4 />

// Layer4 is the end component, that will render both p and Switch
const Layer4 = () => (
  <Toggle.Consumer>
    {({on, onToggle}) => (
      <>
        <p className='text-sm mb-2'>Layer4: the variable 'on' is <strong>{on ? 'on' : 'off'}</strong></p>
        <Switch on={on} onClick={onToggle} />
      </>
    )}
  </Toggle.Consumer>
)

// At the end, we are only cascading each component. At the end, you should only see:
// Layer2 p tag
// Layer4 p tag and Switch component
// All Layer1, Layer2, Layer3 and Layer4 should be able to consume the Context Provider

function ProviderPage (props: any) {
  const onToggle = (...args: any) => console.log('ProviderPage on Toggle args:', ...args)

  return (
    <>
      <h1 className='text-2xl font-bold text-gray-700 mb-4'>Provider Pattern</h1>

      <Toggle onToggle={onToggle} {...props}>
        <Layer1 />
      </Toggle>

      <p className='text-xs font-medium mt-4'>Check your console to see the extra data :) </p>
    </>
  )
}

export default ProviderPage
