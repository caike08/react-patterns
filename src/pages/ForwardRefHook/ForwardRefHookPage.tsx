/* eslint-disable react-refresh/only-export-components */
// ForwardRef hook
// Reference: https://javascript.plainenglish.io/using-forwardref-with-react-hooks-9d0d096ad810

import { forwardRef, useRef, useState, MouseEvent } from 'react'

interface ModalComponentPropType {
  title: string
  description: string
  toggleModal: () => void
}

const MODAL_TITLE = 'This is the modal title!'
const MODAL_DESCRIPTION = 'This is the modal description. Does forwardRef work?'

const ModalComponent = forwardRef<HTMLDivElement, ModalComponentPropType>(
  ({ title, description, toggleModal }, ref) => {
    console.log('ref', ref)

    return (
      <div
        className='flex gap-4 items-center justify-center flex-col border border-gray-200 p-4 rounded shadow'
        ref={ref}
      >
        <h3 className='text-lg font-bold text-center'>{title}</h3>
        <p className='text-md mb-2 font-medium'>{description}</p>
        <button
          className='bg-gray-200 p-2 rounded hover:bg-gray-300 px-4 py-2'
          onClick={toggleModal}
        >
          Close
        </button>
      </div>
    )
  }
)

const ForwardRefHookPage = () => {
  const [ modal, setModal ] = useState<boolean>(false)  // state used to display the modal

  const modalRef = useRef<HTMLDivElement>(null) // creating ref to the modal

  const toggleModal = () => {
    setModal(!modal)
  }

  // if we click on the main div (component) it should close the modal
  const handleOutsideClick = (event: MouseEvent) => {
    if(modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModal(false)
    }
  }

  return (
    <div
      className='flex gap-4 items-center justify-center flex-col'
      onClick={handleOutsideClick}
    >
      <h1 className='text-2xl font-bold'>ForwardRef Hook Page</h1>

      <p>Generic page with a button to open a modal</p>

      <button
        className='bg-green-400 p-2 rounded hover:bg-green-500 px-4 py-2'
        onClick={toggleModal}
      >
        Open Modal
      </button>

      <p className='text-xs font-medium mt-4'>Check your console to see the extra data :) </p>

      {modal && (
        <ModalComponent
          ref={modalRef}
          toggleModal={toggleModal}
          title={MODAL_TITLE}
          description={MODAL_DESCRIPTION}
        />
      )}
    </div>
  )
}

export default ForwardRefHookPage
