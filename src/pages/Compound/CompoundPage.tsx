/*
 * Compound components are a React pattern that providefs an expressive and flexible way for a parent component
 * to communicate with its children, while expressivley separating logic and UI. 
 * In compound components instead of passing state through props, we pass elements as children to a parent element.
 * 
 * Context API uses it :) 
 * 
 * Reference: https://betterprogramming.pub/compound-component-design-pattern-in-react-34b50e32dea0
 * Reference 2: https://frontendmastery.com/posts/advanced-react-component-composition-guide/
 */

import React, { ReactNode, cloneElement, useState } from 'react'

import { cn } from '../../utils/tw-merge'

interface TabsProps {
  children: ReactNode
  onClick: (index: number) => void
  className?: string
}

const Tabs = ({ children }: TabsProps) => {
  const [ activeIndex, setActiveIndex ] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.Children.map(children, (child: any, index: number) => {
    // passing the desired props to Tab
    return cloneElement(child, {
      onClick: () => setActiveIndex(index),
      className: cn(
        'p-2 text-sm font-medium text-gray-800 dark:text-gray-300 cursor-pointer', {
          'text-blue-600 dark:text-blue-500 underline': activeIndex === index
        }
      ),
    })
  })
}

interface TabProps {
  children: ReactNode
}

Tabs.Tab = ({ children, ...props}: TabProps) => {
  return (
    <div {...props}>
      {children}
    </div>)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ParentComponent = (props: any) => {
  return (
    <>
      <p className='text-lg font-bold text-gray-700'>Click to select an item: </p>
    
      <Tabs {...props}>
        <Tabs.Tab>Item 1</Tabs.Tab>
        <Tabs.Tab>Item 2</Tabs.Tab>
        <Tabs.Tab>Item 3</Tabs.Tab>
      </Tabs>
    </>
  )
}

export default ParentComponent
