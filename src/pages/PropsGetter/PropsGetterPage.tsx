/* eslint-disable @typescript-eslint/no-explicit-any */
// Props Getter Pattern
// Reference: https://medium.com/@elhamelshami.dev/what-is-the-prop-getters-pattern-26349e5637df

import { ReactNode, useState } from 'react'

import Switch from '../../components/Switch/Switch'

const PROPS_GETTER_TITLE = 'Prop Getter Pattern'

type ToggleProps = {
  children: ({ on, title, propsGetter }: { on: boolean, title: string, propsGetter: (props: unknown) => any }) => ReactNode
}

const Toggle = ({children}: ToggleProps) => {
  const [ on, setOn ] = useState<boolean>(false)
  const toggle = () => setOn(!on)

  // method to get props
  const propsGetter = ({ onClick, ...props}: any) => ({
    // what if I want to inject any extra function inside onClick?
    onClick: (...args: any) => {
      onClick && onClick(...args);
      toggle();
    },
    ...props
  })

  const getPropsCollection = () => ({
    on,
    title: PROPS_GETTER_TITLE,
    propsGetter
  })

  return children(getPropsCollection())
}

const PropsGetter = (props: any) => {
  const customClick = () => console.log('Hey, this arrow function was injected to be used in propsGetter')

  return (
    <>
      <Toggle {...props}>
        {({ on, title, propsGetter }) => (
          <>
            <h1 className='text-2xl font-bold text-gray-700 mb-4'>{title}</h1>  

            <Switch {...propsGetter({ on })} />

            <button
              aria-label='custom-button'
              className='bg-gray-200 p-2 rounded hover:bg-gray-300 px-4 py-2 mt-4'
              {...propsGetter({
                onClick: customClick, // so I'm passing customClick here to be called along with toggle function
                'area-pressed': `${on}`
              })}
            >
              {'toggle ' + (on ? 'on' : 'off')}
            </button>

            <p className='text-xs font-medium mt-4'>Check your console to see the extra function being called inside onClick :) </p>
          </>
        )}
      </Toggle>
    </>
  )
}

export default PropsGetter
