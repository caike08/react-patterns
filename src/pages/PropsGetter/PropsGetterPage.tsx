/* Props Getter Pattern
 *
 * The Prop Getter pattern is a React technique that abstracts the process of merging external and internal component props.
 * It exposes a function (commonly called propsGetter) that accepts custom props—such as event handlers—and combines them
 * with the component’s own logic, like state management or additional side effects. This results in a flexible API that
 * allows consumers to inject custom behavior while preserving encapsulated internal functionality.
 * 
 * Reference: https://medium.com/@elhamelshami.dev/what-is-the-prop-getters-pattern-26349e5637df
 */

import { FC, ReactNode, useState } from 'react'

import Switch from '../../components/Switch/Switch'

const PROPS_GETTER_TITLE = 'Prop Getter Pattern'

// The PropsGetterFunction accepts any object with an optional onClick and returns the same object with onClick guaranteed.
type PropsGetterFunction = <T extends { onClick?: (...args: unknown[]) => void }>(
  props: T
) => Omit<T, "onClick"> & { onClick: (...args: unknown[]) => void }

type ToggleProps = {
  children: (data: { on: boolean; title: string; propsGetter: PropsGetterFunction }) => ReactNode
}

const Toggle = ({ children }: ToggleProps) => {
  const [on, setOn] = useState<boolean>(false)
  const toggle = () => setOn((prev) => !prev)

  // propsGetter accepts an object with an optional onClick, returning the same object with an enhanced onClick.
  const propsGetter: PropsGetterFunction = <T extends { onClick?: (...args: unknown[]) => void }>(
    { onClick, ...props }: T
  ): Omit<T, "onClick"> & { onClick: (...args: unknown[]) => void } => ({
    ...props,
    // what if I want to inject any extra function inside onClick?
    onClick: (...args: unknown[]) => {
      if (onClick) onClick(...args)
      toggle()
    },
  })

  const getPropsCollection = () => ({
    on,
    title: PROPS_GETTER_TITLE,
    propsGetter
  })

  return children(getPropsCollection())
}

const PropsGetter: FC = () => {
  const customClick = () =>
    console.log('Hey, this arrow function was injected to be used in propsGetter')

  return (
    <>
      <Toggle>
        {({ on, title, propsGetter }) => (
          <>
            <h1 className='text-2xl font-bold text-gray-700 mb-4'>{title}</h1>

            <Switch {...propsGetter({ on, onClick: () => {} })} />

            <button
              aria-label='custom-button'
              className='bg-gray-200 p-2 rounded hover:bg-gray-300 px-4 py-2 mt-4'
              {...propsGetter({
                onClick: customClick, // customClick is injected and will be called along with toggle
                'aria-pressed': on ? 'true' : 'false' as 'true' | 'false',
              })}
            >
              {'toggle ' + (on ? 'on' : 'off')}
            </button>

            <p className='text-xs font-medium mt-4'>
              Check your console to see the extra function being called inside onClick :)
            </p>
          </>
        )}
      </Toggle>
    </>
  )
}

export default PropsGetter
