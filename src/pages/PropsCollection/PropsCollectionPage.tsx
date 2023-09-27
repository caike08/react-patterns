// Props Collection Pattern
// Reference: https://medium.com/@elhamelshami.dev/what-is-the-prop-getters-pattern-26349e5637df

import { ReactNode, useState } from 'react'
import Switch from '../../components/Switch/Switch'

interface ToggleProps {
  children: (props: { on: boolean, title: string, propsCollection: { onClick: () => void } }) => ReactNode
}

const PROPS_COLLECTION_TITLE = 'Props Collection Pattern Example'

const Toggle = ({ children }: ToggleProps) => {
  const [ on, setOn ] = useState<boolean>(false)
  const toggle = () => setOn(!on)

  const getPropsCollection = () => {
    return {
      on,
      title: PROPS_COLLECTION_TITLE,
      // specific props to switch component
      propsCollection: {
        onClick: toggle,
      }
    }
  }
  
  return children(getPropsCollection())
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PropsCollection = (props: any) => {
  return (
    <Toggle {...props}>
      {({ on, title, propsCollection }) => (
        <>
          <h1 className='text-2xl font-bold text-gray-700 mb-4'>{title}</h1>    
          {/* And... propsCollection is passed here */}
          <Switch on={on} {...propsCollection} />
        </>
      )}
    </Toggle>
  )
}

export default PropsCollection
