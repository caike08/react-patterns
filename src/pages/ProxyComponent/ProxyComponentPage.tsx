// Proxy Component Page
// A proxy component is a placeholder component that can be rendered to or from another component. 
// In short a proxy component is a reusable component.
// Reference: https://reactpatterns.js.org/docs/proxy-component/

import { ReactNode } from 'react'
import { cn } from '../../utils/tw-merge'

const enum ButtonType {
  PRIMARY = 'primary',
  DEFAULT = 'default',
}

type ButtonProps = {
  onClick: () => void
  type?: ButtonType
  children: ReactNode
}

const Button = ({ onClick, type = ButtonType.DEFAULT, children }: ButtonProps) => {
  const buttonStyle = cn('rounded px-4 py-2', {
    'bg-green-400  hover:bg-green-500': type === ButtonType.PRIMARY,
    'bg-gray-400 rounded hover:bg-gray-500': type === ButtonType.DEFAULT,
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

const ProxyComponentPage = () => {
  const handleFirstButtonClick = () => {
    console.log('first button clicked with', `type ${ButtonType.PRIMARY}`)
  }

  const handleSecondButtonClick = () => {
    console.log('second button clicked')
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
      <br />
      <Button onClick={handleSecondButtonClick}>Second button</Button>

      <p className='text-gray-700 mt-4 text-xs'>
        Check your console to see the extra data :)
      </p>
    </div>
  )
}

export default ProxyComponentPage
