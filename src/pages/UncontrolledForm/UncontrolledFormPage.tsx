/* eslint-disable @typescript-eslint/no-explicit-any */
// Controlled Form

import { FormEvent, forwardRef, useRef } from 'react'

interface UncontrolledFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const UncontrolledForm = forwardRef<HTMLFormElement, UncontrolledFormProps>(
  ({ handleSubmit }: UncontrolledFormProps, ref) => {
    return (
      <form
        ref={ref}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2'
        onSubmit={handleSubmit}
      >
        <label htmlFor='name' className='label text-sm font-bold'>
          Name
        </label>
        <input
          className='input w-full rounded border border-gray-200 h-8 px-2'
          type='text'
          id='name'
          name='name'
        />
        <label htmlFor='email' className='label text-sm font-bold'>
          Email
        </label>
        <input
          className='input w-full rounded border border-gray-200 h-8 px-2'
          type='email'
          id='email'
          name='email'
        />
        <label htmlFor='password' className='label text-sm font-bold'>
          Password
        </label>
        <input
          className='input w-full rounded border border-gray-200 h-8 px-2'
          type='password'
          id='password'
          name='password'
        />
        <label htmlFor='agreement' className='label mb-2 text-sm flex items-center gap-1 cursor-pointer'>
          <input
            className='w-4 h-4 cursor-pointer'
            type='checkbox'
            id='agreement'
            name='agreement'
          />
          I agree to the {' '}
          <a href='#' className='link text-blue-500 hover:underline hover:underline-offset-2'>terms and conditions</a>
        </label>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed'
        >
          Submit
        </button>
      </form>
      )
    }
)

const UncontrolledFormPage = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(formRef.current) {
      console.log(
        Array.from(formRef.current.elements)
          .map(({ name, value, checked }: any) => {
            if (name === 'agreement')
              return `${name}: ${checked}`;
            return `${name}: ${value}`;
          })
      )
    }
  }

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl'>Uncontrolled Form</h1>

      <UncontrolledForm
        ref={formRef}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default UncontrolledFormPage
