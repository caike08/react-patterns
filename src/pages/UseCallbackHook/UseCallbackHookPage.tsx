// useCallback hook

import { ReactNode, memo, useCallback, useState } from 'react'

import { cn } from '../../utils/tw-merge'

const enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  DEFAULT = 'default',
}

interface ButtonProps {
  onClick: () => void
  type?: ButtonType
  children: ReactNode
}

// proxy component 
// memo lets you skip re-rendering a component when its props are unchanged
const Button = memo(
  ({ onClick, type = ButtonType.DEFAULT, children }: ButtonProps) => {
    const buttonStyle = cn('rounded px-4 py-2', {
      'bg-blue-400 hover:bg-blue-500': type === ButtonType.PRIMARY,
      'bg-green-400 hover:bg-green-500': type === ButtonType.SECONDARY,
      'bg-red-400 hover:bg-red-500': type === ButtonType.DANGER,
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
)

const UseCallbackHookPage = () => {
  const [ count, setCount ] = useState<number>(0)

  // useCallback is a Hook that lets you cache a function definition between re-renders
  const incrementCount = useCallback(() => {
    setCount(count + 1)
  }, [count])

  // for memoization purposes :)
  const decrementCount = useCallback(() => {
    setCount(count - 1)
  }, [count])

  return (
    <div className='flex gap-4 items-center justify-center flex-col bg-gray-100 rounded-md p-4 shadow mb-4'>
      <h1 className='text-2xl font-bold text-center text-gray-700'>UseCallback Hook</h1>

      <p className='text-md font-bold text-center text-gray-700'>
        Click count: {count}
      </p>

      <div className='flex gap-4 items-center justify-center'>
        <Button
          onClick={decrementCount}
          type={ButtonType.DANGER}
        >
          -
        </Button>
        <Button
          onClick={incrementCount}
          type={ButtonType.SECONDARY}
        >
          +
        </Button>
      </div>

    </div>
  )
}

export default UseCallbackHookPage
