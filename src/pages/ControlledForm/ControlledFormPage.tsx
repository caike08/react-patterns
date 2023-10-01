/* eslint-disable @typescript-eslint/no-explicit-any */
// Controlled Form

import { ChangeEvent, FormEvent, useState } from "react";

interface ControlledFormProps {
  email: string;
  name: string;
  password: string;
  agreement: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ControlledForm = ({
  email,
  name,
  password,
  agreement,
  handleSubmit,
  handleChange,
}: ControlledFormProps) => {
  return (
    <form
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
        value={name}
        onChange={handleChange}
      />
      <label htmlFor='email' className='label text-sm font-bold'>
        Email
      </label>
      <input
        className='input w-full rounded border border-gray-200 h-8 px-2'
        type='email'
        id='email'
        name='email'
        value={email}
        onChange={handleChange}
      />
      <label htmlFor='password' className='label text-sm font-bold'>
        Password
      </label>
      <input
        className='input w-full rounded border border-gray-200 h-8 px-2'
        type='password'
        id='password'
        name='password'
        value={password}
        onChange={handleChange}
      />
      <label htmlFor='agreement' className='label mb-2 text-sm flex items-center gap-1 cursor-pointer'>
        <input
          className='w-4 h-4 cursor-pointer'
          type='checkbox'
          id='agreement'
          name='agreement'
          checked={agreement}
          onChange={handleChange}
        />
        I agree to the {' '}
        <a href='#' className='link text-blue-500 hover:underline hover:underline-offset-2'>terms and conditions</a>
      </label>
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed'
        disabled={!agreement}
      >
        Submit
      </button>
    </form>
  )
}

const ControlledFormPage = (props: any) => {
  const [ state, setState ] = useState(props)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('state:', state)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value, checked } } = event

    setState({
      ...state,
      [name]: name === 'agreement' ? checked : value
    })
  }

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl'>Controlled Form</h1>

      <ControlledForm
        {...state}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  )
}

ControlledFormPage.defaultProps = {
  email: '',
  name: '',
  password: '',
  agreement: false,
}

export default ControlledFormPage
