import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

// Components
import Layout from './components/Layout/Layout'

// Pages

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>

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
