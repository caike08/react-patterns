/* render props pattern:
 * The Render Props pattern is a React technique that allows components to share logic while giving consumers 
 * the flexibility to define how the logic should be rendered. Instead of passing UI components as children, 
 * a function is passed as the `children` prop, which receives data or behavior as arguments and returns JSX to render.
 * This pattern enables better code reuse, as the same logic can be applied to different UI components.
 * Reference: https://flexiple.com/react/render-props-an-advanced-react-pattern
  * Reference 2: https://reactpatterns.com/
  */
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

const ToggleComponent = () => {
  return (
    <>
      <h1 className='text-2xl font-bold text-gray-700 mb-4'>Render Props Pattern</h1>    
      <Toggle>
        {({ on, toggle }) => (
          <>
            <Switch on={on} onClick={toggle} />
          </>
        )}
      </Toggle>
    </>
  )
}

export default ToggleComponent
