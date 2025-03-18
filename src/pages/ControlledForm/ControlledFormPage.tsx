/* Controlled Form
 *
 * The Controlled Form pattern in React involves managing the form's input state within a parent component,
 * which then passes the state and corresponding event handlers down to the form elements. This example demonstrates
 * how a form's data (e.g., name, email, password, and agreement status) is controlled by a component's state.
 * The ControlledForm component renders the form and relies on props for both the field values and the event handlers,
 * while ControlledFormPage manages the state updates, ensuring that user input is reflected immediately in the component's state.
 */

import { ChangeEvent, FC, FormEvent, useState } from 'react'

/**
 * Interface describing the props required by the ControlledForm component.
 * It includes form field values as well as event handlers for submitting the form and handling changes.
 */
interface ControlledFormProps {
  email: string
  name: string
  password: string
  agreement: boolean
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

/**
 * ControlledForm component renders a form with controlled inputs.
 * The form fields' values are provided via props, and events (submit and change) are delegated to handlers passed in props.
 */
const ControlledForm: FC<ControlledFormProps> = ({
  email,
  name,
  password,
  agreement,
  handleSubmit,
  handleChange,
}) => {
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
      <label
        htmlFor='agreement'
        className='label mb-2 text-sm flex items-center gap-1 cursor-pointer'
      >
        <input
          className='w-4 h-4 cursor-pointer'
          type='checkbox'
          id='agreement'
          name='agreement'
          checked={agreement}
          onChange={handleChange}
        />
        I agree to the{' '}
        <a
          href='#'
          className='link text-blue-500 hover:underline hover:underline-offset-2'
        >
          terms and conditions
        </a>
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

/**
 * Interface representing the complete form data.
 */
interface FormData {
  email: string
  name: string
  password: string
  agreement: boolean
}

/**
 * Default form data used when no props are provided.
 */
const defaultFormData: FormData = {
  email: '',
  name: '',
  password: '',
  agreement: false,
}

/**
 * ControlledFormPage demonstrates the Controlled Form pattern.
 * It uses local state to manage form data, passes the state and event handlers
 * to the ControlledForm component, and updates state as the user interacts with the form.
 *
 * We define the component's props as Partial<FormData> so that it's optional to pass any initial values.
 * The default values are merged with any provided props.
 */
const ControlledFormPage: FC<Partial<FormData>> = (props) => {
  // Initialize form data by merging default values with any provided props.
  const initialData: FormData = {
    email: props.email ?? defaultFormData.email,
    name: props.name ?? defaultFormData.name,
    password: props.password ?? defaultFormData.password,
    agreement: props.agreement ?? defaultFormData.agreement,
  }

  const [state, setState] = useState<FormData>(initialData)

  /**
   * Handles form submission by preventing the default browser behavior
   * and logging the current state.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('state:', state)
  }

  /**
   * Handles changes in any of the form's input elements.
   * Updates state accordingly, treating checkboxes differently from other inputs.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value, checked, type },
    } = event

    setState({
      ...state,
      [name]: type === 'checkbox' ? checked : value,
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

export default ControlledFormPage
