import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

// Components
import Layout from './components/Layout/Layout'
import NotFound from './components/NotFound/NotFound'

// Pages
import DefaultPage from './pages/Default/DefaultPage'
import CompoundPage from './pages/Compound/CompoundPage'
import ContextPage from './pages/Context/ContextPage'
import RenderProps from './pages/RenderProps/RenderPropsPage'
import PropsCollection from './pages/PropsCollection/PropsCollectionPage'
import PropsGetter from './pages/PropsGetter/PropsGetterPage'
import StateInitializers from './pages/StateInitializers/StateInitializersPage'
import StateReducer from './pages/StateReducer/StateReducerPage'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/1-default-component' element={<DefaultPage />} />
      <Route path='/2-compound-component' element={<CompoundPage />} />
      <Route path='/3-context-component' element={<ContextPage />} />
      <Route path='/4-render-props' element={<RenderProps />} />
      <Route path='/5-props-collection' element={<PropsCollection />} />
      <Route path='/6-props-getter' element={<PropsGetter />} />
      <Route path='/7-state-initializers' element={<StateInitializers />} />
      <Route path='/8-state-reducers' element={<StateReducer />} />
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
