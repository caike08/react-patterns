// render props pattern
// Reference: https://flexiple.com/react/render-props-an-advanced-react-pattern
import { ReactNode, useState } from 'react'

import Switch from '../../components/Switch/Switch'

interface ToggleProps {
  children: ({ on, toggle }: { on: boolean, toggle: () => void }) => ReactNode
}

const Toggle = ({ children }: ToggleProps) => {
  const [ on, setOn ] = useState<boolean>(false)
  const toggle = () => setOn(!on)

  // In a Class component, this would have been within render() method, thus the render props pattern.
  return children({
    on,
    toggle,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderProps = (props: any) => {
  return (
    <>
      <h1 className='text-2xl font-bold text-gray-700 mb-4'>Render Props Pattern</h1>    
      <Toggle {...props}>
        {({ on, toggle }) => (
          <>
            <Switch on={on} onClick={toggle} />
          </>
        )}
      </Toggle>
    </>
  )
}

export default RenderProps
