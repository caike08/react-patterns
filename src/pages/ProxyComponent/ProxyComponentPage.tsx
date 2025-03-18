/* Proxy Component Page
 * A proxy component is a placeholder component that can be rendered to or from another component. 
 * In short a proxy component is a reusable component.
 * 
 * The Proxy Pattern allows an object (the proxy) to control access to another object (the actual implementation).
 * In this case, the `Button` component is the proxy, providing different styles and behavior depending on the button's type (`PRIMARY` or `DEFAULT`).
 * The `ProxyComponentPage` demonstrates two buttons, where each proxies its respective click behavior to its specific handler function.
 * The `Button` component can be reused in different contexts while abstracting style and behavior customization.

 * Reference: https://reactpatterns.js.org/docs/proxy-component/
 */

import { FC, ReactNode } from 'react'
import { cn } from '../../utils/tw-merge'

/**
 * Enum representing the types of buttons that can be created.
 */
enum ButtonType {
  PRIMARY = 'primary',
  DEFAULT = 'default',
}

/**
 * Props for the Button component.
 * - `onClick`: Function to call when the button is clicked.
 * - `type`: Optional. Determines the button style (default or primary).
 * - `children`: The content of the button.
 */
type ButtonProps = {
  onClick: () => void
  type?: ButtonType
  children: ReactNode
}

/**
 * Button component.
 * Renders a button with a style depending on the `type` prop.
 * Uses the `cn` utility to conditionally apply class names for styling.
 */
const Button: FC<ButtonProps> = ({ onClick, type = ButtonType.DEFAULT, children }) => {
  const buttonStyle = cn('rounded px-4 py-2', {
    'bg-green-400 hover:bg-green-500': type === ButtonType.PRIMARY,
    'bg-gray-400 hover:bg-gray-500': type === ButtonType.DEFAULT,
  })

  return (
    <button
      className={buttonStyle}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

/**
 * ProxyComponentPage is a demo page to show the usage of the Button component.
 * It proxies calls to the handle click functions depending on which button is clicked.
 */
const ProxyComponentPage: FC = () => {
  const handleFirstButtonClick = () => {
    console.log('First button clicked with', `type ${ButtonType.PRIMARY}`)
  }

  const handleSecondButtonClick = () => {
    console.log('Second button clicked')
  }

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold text-gray-700 mb-4'>Proxy Component</h1>

      <Button
        onClick={handleFirstButtonClick}
        type={ButtonType.PRIMARY}
      >
        First button
      </Button>
      <Button onClick={handleSecondButtonClick}>
        Second button
      </Button>

      <p className='text-gray-700 mt-4 text-xs'>
        Check your console to see the extra data :)
      </p>
    </div>
  )
}

export default ProxyComponentPage
