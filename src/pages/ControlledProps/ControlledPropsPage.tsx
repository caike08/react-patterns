 /* React controlled props pattern
  *
  * The Controlled Props pattern is a React technique that allows a component to work in both controlled and uncontrolled modes.
  * In this pattern, the component first checks whether a state value (such as 'on') is provided as a prop. If so, the parent
  * component controls the state and provides an onToggle callback to handle state updates. Otherwise, the component manages its
  * own state internally using hooks like useState. This dual behavior offers flexibility: it can be externally controlled when needed,
  * yet still function independently with sensible default behavior.
  *
  * https://dev.to/robogeek95/react-controlled-props-pattern-3ej1
  * https://kentcdodds.com/blog/control-props-vs-state-reducers
  */

import { FC, useState } from 'react'
import Switch from '../../components/Switch/Switch'

interface ToggleProps {
  on?: boolean
  onToggle?: (on: boolean) => void
}

/**
 * Toggles the current state of the component.
 *
 * If the component is controlled (i.e., the `on` prop is provided), it delegates
 * the toggling action to the `onToggle` callback prop, passing the new state as
 * an argument. Otherwise, it updates the internal state to reflect the toggled value.
 *
 * This function ensures that the component behaves correctly whether it is controlled
 * or uncontrolled.
 * 
 * @param on The current state of the component.
 * @param onToggle The callback to handle state updates.
 */
const Toggle: FC<ToggleProps> = (props) => {
  const [internalOn, setInternalOn] = useState<boolean>(false)

  // Check if the component is controlled (i.e. if the prop is provided)
  const checkIfControlled = (key: keyof ToggleProps): boolean => {
    return props[key] !== undefined
  }

  // Get the current value: controlled from parent or internal state
  const getOn = () => {
    return checkIfControlled('on') ? props.on! : internalOn
  }

  // Toggle the state: delegate to onToggle if controlled, or update internal state otherwise
  const toggle = () => {
    if (checkIfControlled('on')) {
      return props.onToggle?.(!getOn())
    } else {
      return setInternalOn(!internalOn)
    }
  }

  return (
    <>
      <Switch on={getOn()} onClick={toggle} />

      <button
        className='bg-gray-200 p-2 rounded hover:bg-gray-300 px-4 py-2 mt-4'
        onClick={toggle}
      >
        {getOn() ? 'ON' : 'OFF'}
      </button>
    </>
  )
}

/**
 * ControlledProps demonstrates the use of the controlled props pattern.
 */
const ControlledProps: FC = () => {
  const [bothOn, setBothOn] = useState<boolean>(false)

  const handleToggle = (on: boolean) => {
    // One toggle affects the other, meaning that the state is controlled from the parent.
    setBothOn(on)
  }

  return (
    <>
      <h1 className='text-2xl font-bold text-gray-700 mb-4'>Controlled Props Pattern</h1>

      <Toggle on={bothOn} onToggle={handleToggle} />
      <br />
      <Toggle on={bothOn} onToggle={handleToggle} />
    </>
  )
}

export default ControlledProps
