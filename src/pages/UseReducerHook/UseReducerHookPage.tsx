// useReducer hook
// Reference: https://react.dev/reference/react/useReducer

import { useReducer } from 'react'

const enum REDUCER_TYPE {
  INCREMENT_AGE = 'INCREMENT_AGE',
  DECREMENT_AGE = 'DECREMENT_AGE',
}

const reducer = (state: { age: number }, action: { type: REDUCER_TYPE }) => {
  console.table({
    state: JSON.stringify(state),
    action: action.type,
  })

  switch (action.type) {
    case REDUCER_TYPE.INCREMENT_AGE:
      return {
        age: state.age + 1
      }
    case REDUCER_TYPE.DECREMENT_AGE:
      return {
        age: state.age - 1
      }
    default:
      throw Error('Unknown action type')
  }
}

const UseReducerHookPage = () => {
  const [state, dispatch] = useReducer(reducer, { age: 21 })

  const handleIncrementAge = () => {
    dispatch({ type: REDUCER_TYPE.INCREMENT_AGE })
  }

  const handleDecrementeAge = () => {
    dispatch({ type: REDUCER_TYPE.DECREMENT_AGE })
  }

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold mb-4'>UseReducer Hook</h1>

      <p className='text-md font-bold text-center text-gray-700'>
        Age: {state.age}
      </p>

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

      <p className='text-xs font-medium mt-4'>Check your console to see the extra data :) </p>   
    </div>
  )
}

export default UseReducerHookPage
