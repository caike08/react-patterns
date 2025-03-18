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

/**
 * Toggle component uses the render props pattern to provide state (on/off) and a toggle function
 * to its child components. The state is managed internally but passed down through a function
 * that allows the children to control how the UI behaves based on the current state.
 */
const Toggle = ({ children }: ToggleProps) => {
  const [on, setOn] = useState<boolean>(false)
  const toggle = () => setOn(!on)

  // The children function is called with the current state and the toggle function
  return children({
    on,
    toggle,
  })
}

/**
 * ToggleComponent serves as the parent that renders the Toggle component.
 * It demonstrates the render props pattern by passing a function as a child to Toggle,
 * which receives the state (on/off) and the toggle function to control the Switch component.
 */
const ToggleComponent = () => {
  return (
    <>
      <h1 className='text-2xl font-bold text-gray-700 mb-4'>Render Props Pattern</h1>    
      <Toggle>
        {({ on, toggle }) => (
          <>
            {/* The Switch component receives the current state and toggle function */}
            <Switch on={on} onClick={toggle} />
          </>
        )}
      </Toggle>
    </>
  )
}

export default ToggleComponent
