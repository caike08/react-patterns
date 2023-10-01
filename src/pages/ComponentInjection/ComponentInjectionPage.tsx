// Component Injection
// Passing (or inject) a component into another component it's called Component Injection.
// Reference: https://reactpatterns.js.org/docs/component-injection

import { ElementType } from 'react'

type PageWidthPropType = {
  Component: ElementType
}

// component where Component will be passed, to be rendered within it
const PageWidth = ({
  Component
}: PageWidthPropType) => {
  const width = 100

  return (
    <Component width={width} />
  )
}

type DisplayWindowWidthText = {
  width: number
}

// PageWidth width will be renderd within this component
const DisplayWindowWidthText = ({
  width
}: DisplayWindowWidthText) => {
  return (
    <div className='rounded border p-4 bg-gray-100'>
      Window width: {width}
    </div>
  )
}

const ComponentInjectionPage = () => {
  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold mb-4'>Component Injection</h1>

      <PageWidth Component={DisplayWindowWidthText} />
    </div>
  )
}

export default ComponentInjectionPage
