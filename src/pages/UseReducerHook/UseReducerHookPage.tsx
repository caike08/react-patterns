/* useReducer hook
 *
 * The useReducer hook is a React pattern that centralizes state updates into a reducer function.
 * It works similarly to Redux reducers by taking the current state and an action as input and returning the new state.
 * In this example, the reducer handles two actions (INCREMENT_AGE and DECREMENT_AGE) to update the age state.
 * The component dispatches these actions via buttons, and the updated state is rendered accordingly.
 *
 * Reference: https://react.dev/reference/react/useReducer
 */

import { FC, useReducer } from 'react'

/**
 * Enum representing the action types for the reducer.
 */
enum REDUCER_TYPE {
  INCREMENT_AGE = 'INCREMENT_AGE',
  DECREMENT_AGE = 'DECREMENT_AGE',
}

/**
 * Interface for the state managed by the reducer.
 */
interface State {
  age: number
}

/**
 * Interface for actions dispatched to the reducer.
 */
interface Action {
  type: REDUCER_TYPE
}

/**
 * Reducer function to update state based on the dispatched action.
 * It logs the current state and action to the console and returns a new state.
 */
const reducer = (state: State, action: Action): State => {
  console.table({
    state: JSON.stringify(state),
    action: action.type,
  })

  switch (action.type) {
    case REDUCER_TYPE.INCREMENT_AGE:
      return { age: state.age + 1 }
    case REDUCER_TYPE.DECREMENT_AGE:
      return { age: state.age - 1 }
    default:
      throw new Error('Unknown action type')
  }
}

/**
 * UseReducerHookPage component demonstrates how to use the useReducer hook.
 * It initializes state with an age value and provides buttons to increment and decrement that age.
 */
const UseReducerHookPage: FC = () => {
  // Initialize the reducer with an initial state
  const [state, dispatch] = useReducer(reducer, { age: 21 })

  // Dispatch an action to increment age
  const handleIncrementAge = () => {
    dispatch({ type: REDUCER_TYPE.INCREMENT_AGE })
  }

  // Dispatch an action to decrement age
  const handleDecrementeAge = () => {
    dispatch({ type: REDUCER_TYPE.DECREMENT_AGE })
  }

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold mb-4'>UseReducer Hook</h1>
      <p className='text-md font-bold text-center text-gray-700'>Age: {state.age}</p>
      <div className='flex gap-4 items-center justify-center'>
        <button
          className='bg-red-400 p-2 rounded hover:bg-red-500 px-4 py-2'
          onClick={handleDecrementeAge}
        >
          Decrement age
        </button>
        <button
          className='bg-green-400 p-2 rounded hover:bg-green-500 px-4 py-2'
          onClick={handleIncrementAge}
        >
          Increment age
        </button>
      </div>
      <p className='text-xs font-medium mt-4'>
        Check your console to see the extra data :)
      </p>
    </div>
  )
}

export default UseReducerHookPage
