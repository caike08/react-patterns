/* Controlled Form
 *
 * The Uncontrolled Form pattern in React involves using the DOM itself to store form values rather than managing
 * them via React state. This is achieved by using refs to directly access the form elements when needed (e.g., on submission).
 * In this example, the UncontrolledForm component renders the form inputs without React state control. Instead, the
 * UncontrolledFormPage component accesses the input values through a ref attached to the form, extracting the values
 * only when the form is submitted.
 *
 */

import { FC, FormEvent, forwardRef, useRef, useState } from 'react'

/**
 * Props for the UncontrolledForm component.
 * It receives a handleSubmit callback to process the form submission.
 */
interface UncontrolledFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

/**
 * UncontrolledForm is implemented as a forwarded ref component.
 * It renders form elements whose values are not managed by React state.
 * Instead, the DOM is accessed directly via a ref on form submission.
 */
const UncontrolledForm = forwardRef<HTMLFormElement, UncontrolledFormProps>(
  ({ handleSubmit }, ref) => {
    const [agreed, setAgreed] = useState<boolean>(false)

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
        <label
          htmlFor='agreement'
          className='label mb-2 text-sm flex items-center gap-1 cursor-pointer'
        >
          <input
            className='w-4 h-4 cursor-pointer'
            type='checkbox'
            id='agreement'
            name='agreement'
            onChange={(e) => setAgreed(e.target.checked)}
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
          disabled={!agreed}
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed'
        >
          Submit
        </button>
      </form>
    )
  }
)

/**
 * UncontrolledFormPage demonstrates the Uncontrolled Form pattern.
 * It uses a ref to access form values when the form is submitted.
 * The handleSubmit function prevents the default behavior and logs the values of all input fields.
 */
const UncontrolledFormPage: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formRef.current) {
      // Convert the form controls collection to an array and filter for HTMLInputElement instances with a name.
      const formValues = Array.from(formRef.current.elements).filter(
        (el): el is HTMLInputElement =>
          el instanceof HTMLInputElement && el.name !== ''
      ).map(({ name, value, checked }) => 
        name === 'agreement' ? `${name}: ${checked}` : `${name}: ${value}`
      )
      
      console.log(formValues)
    }
  }

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl'>Uncontrolled Form</h1>
      <UncontrolledForm ref={formRef} handleSubmit={handleSubmit} />
    </div>
  )
}

export default UncontrolledFormPage
