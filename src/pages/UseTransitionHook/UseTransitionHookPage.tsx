// useTransitionHook page
// Reference: https://react.dev/reference/react/useTransition

import { ChangeEvent, useState, useTransition } from 'react'

const USER_NAME_LIST = [
  'John',
  'James',
  'Robert',
  'Michael',
  'William',
  'David',
  'Richard',
  'Joseph',
  'Thomas',
  'Charles',
  'Christopher',
  'Daniel',
  'Paul',
  'Mark',
  'Donald',
  'George',
  'Steven',
  'Brian',
  'Anthony',
  'Kevin',
  'Jason',
  'Jeffrey',
  'Mary',
  'Patricia',
  'Linda',
  'Barbara',
  'Elizabeth',
  'Jennifer',
  'Maria',
  'Susan',
  'Margaret',
  'Dorothy',
  'Lisa',
  'Nancy',
  'Betty',
  'Helen',
  'Sandra',
  'Donna',
  'Emily',
  'Kimberly',
  'Sharon',
  'Cynthia',
  'Angela',
  'Melissa',
]

const UseTransitionHookPage = () => {
  const [ searchTerm, setSearchTerm ] = useState('')  // save input search value
  const [ filteredList, setFilteredList ] = useState(USER_NAME_LIST)  // save the current name list
  const [ isPending, startTransiton ] = useTransition() // useTransition Hook

  // handle input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value  // get input value

    setSearchTerm(value)  // save input search value

    // start transition 
    startTransiton(() => {
      // here we want to execute any function. It lets you mark a state update as a transition
      setFilteredList(
        USER_NAME_LIST.filter((name) => {
          return name.toLowerCase().includes(value.toLowerCase())
        })
      )
    })
  }

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 rounded-md p-4 shadow'>
      <h1 className='text-2xl font-bold mb-4'>UseTransition Hook</h1>

      <input
        className='border border-gray-400 rounded p-1 w-80'
        type='text'
        value={searchTerm}
        onChange={handleInputChange}
      />

      <div className='flex gap-4 items-center justify-center'>
        {/* if isPending is true, it will show loading, otherwise it will show the list */}
        {isPending ? (
          <p className='text-xs font-medium mt-4'>🌀 Loading...</p>
        ) : (
          <ul className='list-disc list-inside'>
            {filteredList.map((name) => {
              return <li key={name} className='text-sm'>{name}</li>
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UseTransitionHookPage
