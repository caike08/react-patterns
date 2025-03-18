/*
 * Compound components are a React pattern that provides an expressive and flexible way for a parent component
 * to communicate with its children, while expressively separating logic and UI. 
 * In compound components, instead of passing state through props, we pass elements as children to a parent element.
 * 
 * Context API uses it :) 
 * 
 * Reference: https://betterprogramming.pub/compound-component-design-pattern-in-react-34b50e32dea0
 * Reference 2: https://frontendmastery.com/posts/advanced-react-component-composition-guide/
 */

import React, { Children, FC, ReactNode, cloneElement, useState } from 'react'
import { cn } from '../../utils/tw-merge'

// Props for the Tabs component, which accepts children and an optional className.
interface TabsProps {
  children: ReactNode
  className?: string
}

/**
 * Tabs component serves as the parent for Tab items. It manages which tab is active
 * and handles click events to switch between tabs.
 */
const Tabs = ({ children, className }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return Children.toArray(children)
    .filter(React.isValidElement)
    .map((child: React.ReactElement, index: number) => {
      return cloneElement(child, {
        onClick: () => setActiveIndex(index),
        className: cn(
          'p-2 text-sm font-medium text-gray-800 dark:text-gray-300 cursor-pointer', 
          {
            'text-blue-600 dark:text-blue-500 underline': activeIndex === index
          },
          className
        ),
      })
    })
}

// Props for the individual Tab component
interface TabProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

/**
 * Tab component represents an individual tab. It is used inside the Tabs component.
 * Receives className and onClick from Tabs when being cloned.
 */
Tabs.Tab = ({ children, ...props }: TabProps) => {
  return (
    <div {...props} role="button" tabIndex={0}>
      {children}
    </div>
  )
}

/**
 * ParentComponent demonstrates the use of the Tabs component.
 * It renders a simple tab structure where clicking a tab changes its appearance.
 */
const ParentComponent: FC = () => {
  return (
    <>
      <h1 className="text-xl font-bold text-gray-700 mb-4">Compound Component Pattern</h1>
      <p className="text-md font-bold text-gray-700">Click to select an item:</p>

      <Tabs>
        <Tabs.Tab>Item 1</Tabs.Tab>
        <Tabs.Tab>Item 2</Tabs.Tab>
        <Tabs.Tab>Item 3</Tabs.Tab>
      </Tabs>
    </>
  )
}

export default ParentComponent
