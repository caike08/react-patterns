/* useImperativeHandle is probably one of the more confusing hooks out there as it works in a very different way than most of the other hooks.
 * This hook enables imperative code which goes against the declarative nature of React which makes it quite unique.
 * Because of this reason it is generally recommended to avoid this hook unless it is absolutely needed.
 * Unfortunately, there are plenty of scenarios where this hook is necessary.
 * 
 * Reference: https://blog.webdevsimplified.com/2022-06/use-imperative-handle/
 * Read more at: https://prateeksurana.me/blog/fine-tuning-refs-with-useimperativehandle/
 */

import { ChangeEvent, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'

type CarouselPropType = {
  onSlideChange?: () => void
}

type CarouselImperativeHandleRef = {
  goToSlide: (index: number) => void
}

const IMAGES_CAROUSEL = [
  'https://picsum.photos/id/237/1200/600',
  'https://picsum.photos/id/238/1200/600',
  'https://picsum.photos/id/239/1200/600',
  'https://picsum.photos/id/240/1200/600'
]

const Carousel = forwardRef<CarouselImperativeHandleRef, CarouselPropType>((
  { onSlideChange }: CarouselPropType, ref) => {
    const [ index, setIndex ] = useState(0)

    const previous = () => {
      setIndex(index === 0 ? IMAGES_CAROUSEL.length - 1 : index - 1)
    }

    const next = () => {
      setIndex(index === IMAGES_CAROUSEL.length - 1 ? 0 : index + 1)
    }

    const handleCarouselImageChange = useCallback((event: ChangeEvent<HTMLImageElement>) => {
      console.log('event image loaded', event)

      if (onSlideChange) {
        onSlideChange()
      }
    }, [onSlideChange])

    useImperativeHandle(ref, () => ({
      goToSlide: (index: number) => {
        setIndex(index - 1)
      }
    }))

    return (
      <div className='flex gap-4 items-center justify-center flex-col bg-gray-100 rounded p-4 shadow'>
        <img
          className='w-48 h-48 rounded object-cover'
          src={IMAGES_CAROUSEL[index]}
          alt={`Carousel item ${index}`}
          onLoad={handleCarouselImageChange}
        />

        <div className='flex gap-4 items-center justify-center'>
          <button
            className='bg-red-400 rounded hover:bg-red-500 px-4 py-2 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed'
            onClick={previous}
            disabled={index === 0}
          >
            Previous
          </button>
          <button
            className='bg-green-400 rounded hover:bg-green-500 px-4 py-2 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed'
            onClick={next}
            disabled={index === IMAGES_CAROUSEL.length - 1}
          >
            Next
          </button>
        </div>
        <small className='text-gray-500'>Slide {index + 1} of {IMAGES_CAROUSEL.length}</small>
      </div>
    )
  }
)

const UseImperativeHandlePage = () => {
  const modalRef = useRef<CarouselImperativeHandleRef>(null) // creating ref to the modal

  const handleCarouselImageChange = () => {
    // you should see current.goToSlide() function, as it was injected by useImperativeHandle
    console.log(modalRef)
  }

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold'>UseImperativeHandle Hook Page</h1>

      <Carousel
        ref={modalRef}
        onSlideChange={handleCarouselImageChange} // I want this function to be called after each image load
      />

      <button
        className='bg-green-400 rounded hover:bg-green-500 px-4 py-2'
        onClick={() => modalRef.current?.goToSlide(3)}  // this is the custom function injected by useImperativeHandle
      >
        Go to slide 3
      </button>

      <p className='text-xs font-medium mt-4'>Check your console to see the extra data :) </p>
    </div>
  )
}

export default UseImperativeHandlePage
