/* 
 * UseImperativeHandle hook
 *
 * useImperativeHandle is probably one of the more confusing hooks out there as it works in a very different way than most of the other hooks.
 *
 * The UseImperativeHandle hook in React allows a component to customize the instance value that is exposed to parent
 * components when using refs. Instead of just passing the DOM node, you can expose a set of methods. In this example,
 * the Carousel component uses useImperativeHandle to expose a goToSlide method, enabling parent components to programmatically
 * change the displayed slide. This pattern is especially useful when you need to imperatively control child components while
 * preserving encapsulation.
 * 
 * Reference: https://blog.webdevsimplified.com/2022-06/use-imperative-handle/
 * Read more at: https://prateeksurana.me/blog/fine-tuning-refs-with-useimperativehandle/
 */

import {
  ChangeEvent,
  FC,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

/**
 * Props for the Carousel component.
 * - onSlideChange: Optional callback that is invoked after an image loads.
 */
interface CarouselProps {
  onSlideChange?: () => void
}

/**
 * Interface for the methods exposed via the ref.
 */
export interface CarouselImperativeHandleRef {
  goToSlide: (index: number) => void
}

/**
 * List of image URLs used in the carousel.
 */
const IMAGES_CAROUSEL: string[] = [
  'https://picsum.photos/id/237/1200/600',
  'https://picsum.photos/id/238/1200/600',
  'https://picsum.photos/id/239/1200/600',
  'https://picsum.photos/id/240/1200/600',
]

/**
 * Carousel component uses the useImperativeHandle hook to expose
 * a custom function (goToSlide) to parent components via refs.
 * It renders an image from a carousel and provides buttons to navigate slides.
 */
const Carousel = forwardRef<CarouselImperativeHandleRef, CarouselProps>(
  ({ onSlideChange }, ref) => {
    const [index, setIndex] = useState<number>(0)

    const previous = () => {
      setIndex((prevIndex) =>
        prevIndex === 0 ? IMAGES_CAROUSEL.length - 1 : prevIndex - 1
      )
    }

    const next = () => {
      setIndex((prevIndex) =>
        prevIndex === IMAGES_CAROUSEL.length - 1 ? 0 : prevIndex + 1
      )
    }

    // When the image loads, call onSlideChange if provided.
    const handleCarouselImageChange = useCallback(
      (event: ChangeEvent<HTMLImageElement>) => {
        console.log('Image loaded', event)
        if (onSlideChange) {
          onSlideChange()
        }
      },
      [onSlideChange]
    )

    // Expose the goToSlide method to parent components via the ref.
    useImperativeHandle(ref, () => ({
      goToSlide: (slideNumber: number) => {
        // Convert the 1-indexed slide number to 0-indexed state.
        setIndex(slideNumber - 1)
      },
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
        <small className='text-gray-500'>
          Slide {index + 1} of {IMAGES_CAROUSEL.length}
        </small>
      </div>
    )
  }
)

/**
 * UseImperativeHandlePage demonstrates the useImperativeHandle hook.
 * It creates a ref to the Carousel component to invoke its exposed goToSlide method.
 * Additionally, it provides an onSlideChange callback to log data when an image loads.
 */
const UseImperativeHandlePage: FC = () => {
  const carouselRef = useRef<CarouselImperativeHandleRef>(null)

  const handleCarouselImageChange = () => {
    // Log the ref, which should include the goToSlide function.
    console.log('Carousel ref:', carouselRef.current)
  }

  return (
    <div className='flex gap-4 items-center justify-center flex-col'>
      <h1 className='text-2xl font-bold'>UseImperativeHandle Hook Page</h1>
      <Carousel
        ref={carouselRef}
        onSlideChange={handleCarouselImageChange}
      />
      <button
        className='bg-green-400 rounded hover:bg-green-500 px-4 py-2'
        onClick={() => carouselRef.current?.goToSlide(3)}
      >
        Go to slide 3
      </button>
      <p className='text-xs font-medium mt-4'>
        Check your console to see the extra data :)
      </p>
    </div>
  )
}

export default UseImperativeHandlePage
