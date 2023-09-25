import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

// Components
import Layout from './components/Layout/Layout'

// Pages
import DefaultPage from './pages/Default/DefaultPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/1-default-component' element={<DefaultPage />} />
    </Route>
  )
)


function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
