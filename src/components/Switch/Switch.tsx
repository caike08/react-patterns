import { FC } from 'react'

export interface SwitchPropType {
  label?: string
  on: boolean
  onClick: () => void
}

const Switch: FC<SwitchPropType> = ({ label, on, onClick }) => {
  const switchClassName = `
    w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300
    dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full
    peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px]
    after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
    dark:border-gray-600 peer-checked:bg-blue-600
  `

  return(
    <>
      <label className='relative inline-flex items-center cursor-pointer'>
        <input
          className='sr-only peer'
          type='checkbox'
          value=''
          checked={on}
          onClick={onClick}
          onChange={() => {}}
        />
        <div className={switchClassName} />
        {label && 
          <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>{label}</span>
        }
      </label>
    </>
  )
}

export default Switch
