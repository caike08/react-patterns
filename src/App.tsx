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
import CompoundPage from './pages/Compound/CompoundPage'
import ContextPage from './pages/Context/ContextPage'
import RenderProps from './pages/RenderProps/RenderPropsPage'
import NotFound from './components/NotFound/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/1-default-component' element={<DefaultPage />} />
      <Route path='/2-compound-component' element={<CompoundPage />} />
      <Route path='/3-context-component' element={<ContextPage />} />
      <Route path='/4-render-props' element={<RenderProps />} />
      <Route path='*' element={<NotFound />} />
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
