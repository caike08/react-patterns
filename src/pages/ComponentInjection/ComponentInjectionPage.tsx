/* Component Injection
 *
 * Passing (or inject) a component into another component it's called Component Injection.
 * 
 * The Component Injection Pattern involves passing a component as a prop to a parent component, 
 * which then renders the provided component with additional data or props. 
 * This pattern enables dynamic component composition, making the parent component more flexible and reusable. 
 * In this example, the PageWidth component receives a component (DisplayWindowWidthText) and injects a 'width' prop 
 * into it, allowing for a decoupled way to display varying content based on external logic.
 *
 * Reference: https://reactpatterns.js.org/docs/component-injection
 */

import { ElementType, FC } from 'react'

/**
 * Props for the PageWidth component.
 * It receives a Component to render, which must accept a 'width' prop.
 */
interface PageWidthPropType {
  Component: ElementType<{ width: number }>
}

/**
 * PageWidth component calculates or retrieves a width value (here, hard-coded as 100)
 * and then injects that value as a prop to the provided Component.
 */
const PageWidth: FC<PageWidthPropType> = ({ Component }) => {
  const width = 100

  return <Component width={width} />
}

/**
 * Props for the DisplayWindowWidthText component.
 * It expects a 'width' prop that it uses to display the window width.
 */
interface DisplayWindowWidthTextProps {
  width: number
}

/**
 * DisplayWindowWidthText component renders the provided width inside a styled div.
 */
const DisplayWindowWidthText: FC<DisplayWindowWidthTextProps> = ({ width }) => {
  return (
    <div className='rounded border p-4 bg-gray-100'>
      Window width: {width}
    </div>
  )
}

/**
 * ComponentInjectionPage demonstrates the Component Injection Pattern by
 * passing DisplayWindowWidthText as a prop to the PageWidth component.
 */
const ComponentInjectionPage: FC = () => {
  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold mb-4'>Component Injection</h1>
      <PageWidth Component={DisplayWindowWidthText} />
    </div>
  )
}

export default ComponentInjectionPage
