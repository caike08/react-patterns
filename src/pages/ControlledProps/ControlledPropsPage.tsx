/* eslint-disable @typescript-eslint/no-explicit-any */
// React controlled props pattern
// https://dev.to/robogeek95/react-controlled-props-pattern-3ej1
// https://kentcdodds.com/blog/control-props-vs-state-reducers

import { useState } from 'react'

import Switch from '../../components/Switch/Switch'

const Toggle = (props: any) => {
  const [ on, setOn ] = useState<boolean>(false)

  const checkIfControlled = (arg: any) => {
    // if prop.on (which is the value of useState) is not undefined
    return props[arg] !== undefined
  }

  const getOn = () => {
    // if props.on exists, component is controlled from outside. Otherwise, it is controlled via its internal useState
    return checkIfControlled('on') ? props.on : on
  }

  const toggle = () => {
    // if props.on exists, onToggle is called from parent component. Otherwise, setOn is called
    return checkIfControlled('on')
      ? props.onToggle(!getOn())
      : setOn(!on)
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

const ControlledProps = (props: any) => {
  const [ bothOn, setBothOn ] = useState<boolean>(false)

  const handleToggle = (on: boolean) => {
    // one toggle should affect the other, meaning that it is controlled from outside :)
    setBothOn(on)
  }

  return (
    <>
      <h1 className='text-2xl font-bold text-gray-700 mb-4'>Controlled Props Pattern</h1>

      <Toggle on={bothOn} onToggle={handleToggle} {...props} />
      <br />
      <Toggle on={bothOn} onToggle={handleToggle} {...props} />
    </>
  )
}

export default ControlledProps
