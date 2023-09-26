import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound:FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/1-default-component')
    }, 3000)
  }, [navigate])

  return (
    <div className='text-2xl font-bold text-center'>Page not found or does not exist 🥲 Redirecting...</div>
  )
}

export default NotFound
