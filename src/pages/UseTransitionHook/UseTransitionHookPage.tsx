/* useTransitionHook page
 *
 * The useTransition hook in React allows you to mark state updates as transitions.
 * This means that expensive updates (like filtering a large list) can be deferred,
 * keeping the UI responsive during these updates. In this example, when a user types into the input field,
 * the search term is updated immediately while the filtering operation is marked as a transition.
 * If the update is pending, a loading indicator is displayed until the filtered list is ready.
 *
 * Reference: https://react.dev/reference/react/useTransition
 * 
 */

import { ChangeEvent, FC, useState, useTransition } from 'react'

// A sample list of user names used for filtering.
const USER_NAME_LIST: string[] = [
  'John', 'James', 'Robert', 'Michael', 'William', 'David', 'Richard',
  'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Paul', 'Mark',
  'Donald', 'George', 'Steven', 'Brian', 'Anthony', 'Kevin', 'Jason',
  'Jeffrey', 'Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Jennifer',
  'Maria', 'Susan', 'Margaret', 'Dorothy', 'Lisa', 'Nancy', 'Betty', 'Helen',
  'Sandra', 'Donna', 'Emily', 'Kimberly', 'Sharon', 'Cynthia', 'Angela', 'Melissa',
]

/**
 * UseTransitionHookPage demonstrates the useTransition hook.
 * It renders an input field that filters a list of user names.
 * The filtering update is marked as a transition, allowing React to defer the update,
 * which keeps the UI responsive and shows a loading indicator while the update is in progress.
 */
const UseTransitionHookPage: FC = () => {
  // State for the input value.
  const [searchTerm, setSearchTerm] = useState<string>('')
  // State for the filtered list of user names.
  const [filteredList, setFilteredList] = useState<string[]>(USER_NAME_LIST)
  // useTransition returns a flag indicating if a transition is pending and a function to start a transition.
  const [isPending, startTransition] = useTransition()

  // Handles input changes by updating the search term immediately,
  // then deferring the expensive filtering operation.
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)

    // Mark the filtering state update as a transition.
    startTransition(() => {
      setFilteredList(
        USER_NAME_LIST.filter((name) =>
          name.toLowerCase().includes(value.toLowerCase())
        )
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
        {/* While the transition is pending, display a loading indicator. */}
        {isPending ? (
          <p className='text-xs font-medium mt-4'>🌀 Loading...</p>
        ) : (
          <ul className='list-disc list-inside'>
            {filteredList.length === 0 ? (
              <li className='text-sm'>No results found 😢</li>
            ) : (
              filteredList.map((name) => (
              <li key={name} className='text-sm'>
                {name}
              </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UseTransitionHookPage
