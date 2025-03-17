 /*
 * Props Collection Pattern
 * The Props Collection pattern is a React pattern that allows a component to collect and organize various
 * props and pass them down to child components. This approach helps manage prop logic and grouping in a
 * more organized manner. In this pattern, a parent component can collect necessary props, including those
 * passed by the child, and then pass them down as a collection or an object, which can be spread to any child component.
 * This pattern is useful for simplifying the management of multiple props, especially in components with complex 
 * or reusable functionality.
 * 
 * Reference: https://medium.com/@elhamelshami.dev/what-is-the-prop-getters-pattern-26349e5637df
 */

import { ReactNode, useState } from 'react'
import Switch from '../../components/Switch/Switch'

interface ToggleProps {
  children: (props: { on: boolean, title: string, propsCollection: { onClick: () => void } }) => ReactNode
}

const PROPS_COLLECTION_TITLE = 'Props Collection Pattern Example'

const Toggle = ({ children }: ToggleProps) => {
  const [on, setOn] = useState<boolean>(false)
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

const PropsCollection = () => {
  return (
    <Toggle>
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
