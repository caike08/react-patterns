/* useCallback hook
 *
 * The useCallback hook in React memoizes a function so that it is not recreated on every render unless its dependencies change.
 * In this example, the incrementCount and decrementCount functions are memoized using useCallback.
 * This is especially useful when passing callbacks to memoized child components (like our Button component) to prevent unnecessary re-renders.
 *
 */
import { FC, ReactNode, memo, useCallback, useState } from 'react'
import { cn } from '../../utils/tw-merge'

/**
 * Enum for button style types.
 */
enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  DEFAULT = 'default',
}

/**
 * Props for the Button component.
 */
interface ButtonProps {
  onClick: () => void
  type?: ButtonType
  children: ReactNode
}

/**
 * Button is a memoized component that renders a styled button.
 * It uses the `cn` utility to conditionally apply class names based on the button type.
 */
const Button: FC<ButtonProps> = memo(({ onClick, type = ButtonType.DEFAULT, children }) => {
  const buttonStyle = cn('rounded px-4 py-2', {
    'bg-blue-400 hover:bg-blue-500': type === ButtonType.PRIMARY,
    'bg-green-400 hover:bg-green-500': type === ButtonType.SECONDARY,
    'bg-red-400 hover:bg-red-500': type === ButtonType.DANGER,
    'bg-gray-400 hover:bg-gray-500': type === ButtonType.DEFAULT,
  })

  return (
    <button className={buttonStyle} onClick={onClick}>
      {children}
    </button>
  )
})

/**
 * UseCallbackHookPage demonstrates the use of the useCallback hook to memoize functions.
 * It renders a simple counter with increment and decrement buttons.
 */
const UseCallbackHookPage: FC = () => {
  const [count, setCount] = useState<number>(0)

  // Using functional updater form avoids re-creating these callbacks on each render.
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1)
  }, [])

  const decrementCount = useCallback(() => {
    setCount(prevCount => prevCount - 1)
  }, [])

  return (
    <div className='flex gap-4 items-center justify-center flex-col bg-gray-100 rounded-md p-4 shadow mb-4'>
      <h1 className='text-2xl font-bold text-center text-gray-700'>UseCallback Hook</h1>
      <p className='text-md font-bold text-center text-gray-700'>Click count: {count}</p>
      <div className='flex gap-4 items-center justify-center'>
        <Button onClick={decrementCount} type={ButtonType.DANGER}>
          -
        </Button>
        <Button onClick={incrementCount} type={ButtonType.SECONDARY}>
          +
        </Button>
      </div>
    </div>
  )
}

export default UseCallbackHookPage
