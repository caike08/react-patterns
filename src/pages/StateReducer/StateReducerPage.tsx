/* State Reducer Pattern: In the context of React, this reducer function acts on the state object.
 *
 * The State Reducer pattern is a React pattern that centralizes state updates into a reducer function.
 * Instead of directly calling setState within event handlers, state transitions are delegated to a reducer,
 * *which takes the current state and an action as inputs and returns the new state*. This approach provides
 * greater control over state changes, making it easier to intercept or modify updates, and enhances consistency
 * in state management. In this implementation, actions such as adding or removing an item from the cart are
 * dispatched to a reducer function, which calculates and returns the updated state.
 * 
 * Reference: https://ziimm.medium.com/design-patterns-in-react-part-iii-the-reducer-pattern-8937921ecacd
 */

import { Component, FC } from 'react'
import { cn } from '../../utils/tw-merge'

const enum DISPATCH_ACTIONS {
  ADD_ITEM = 'addItem',
  REMOVE_ITEM = 'removeItem',
}

type CartState = {
  cartItems: number
}

type Action =
  | { type: DISPATCH_ACTIONS.ADD_ITEM }
  | { type: DISPATCH_ACTIONS.REMOVE_ITEM }

/**
 * The dispatch function takes an action and returns a reducer function.
 * That reducer receives the current state (and props, if needed) and returns the updated state.
 */
const dispatch = (action: Action) => (state: CartState, props: Record<string, never>): CartState => {
  console.table({
    state: JSON.stringify(state),
    props: JSON.stringify(props),
    action: action.type,
  })

  switch (action.type) {
    case DISPATCH_ACTIONS.ADD_ITEM:
      return {
        cartItems: state.cartItems + 1,
      }
    case DISPATCH_ACTIONS.REMOVE_ITEM:
      return {
        cartItems: state.cartItems - 1,
      }
    default:
      return state
  }
}

// in a functional component, we use useDispatch() hook to dispatch actions
class Cart extends Component<Record<string, never>, CartState> {
  state: CartState = {
    cartItems: 0,
  }

  addItemToCart = () => {
    this.setState(
      dispatch({
        type: DISPATCH_ACTIONS.ADD_ITEM,
      })
    )
  }

  removeItemFromCart = () => {
    this.setState(
      dispatch({
        type: DISPATCH_ACTIONS.REMOVE_ITEM,
      })
    )
  }

  render() {
    const { cartItems } = this.state
    const disableButton = cartItems === 0

    return (
      <div className='flex gap-4 items-center justify-center flex-col'>
        <div className='flex gap-4 items-center justify-center flex-col bg-gray-100 rounded p-4'>
          <p>Cart: {cartItems}</p>
        </div>

        <div className='inline-flex gap-4 items-center justify-center flex-row'>
          <button
            className='bg-green-400 p-2 rounded hover:bg-green-500 px-4 py-2'
            onClick={this.addItemToCart}
          >
            Add item
          </button>
          <button
            className={cn('bg-red-400 p-2 rounded hover:bg-red-500 px-4 py-2', {
              'cursor-not-allowed bg-gray-200 hover:bg-gray-200 opacity-50': disableButton,
            })}
            onClick={this.removeItemFromCart}
            disabled={disableButton}
          >
            Remove item
          </button>
        </div>
      </div>
    )
  }
}

const StateReducer: FC = () => {
  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold mb-4'>State Reducer Pattern</h1>
      <Cart />
      <p className='text-xs font-medium mt-4'>Check your console to see the extra data :)</p>
    </div>
  )
}

export default StateReducer
