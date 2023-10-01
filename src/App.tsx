import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

// Constants
import { PATTERN_PAGES_URLS } from './constants/pages.const'

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
import ControlledProps from './pages/ControlledProps/ControlledPropsPage'
import ProviderPage from './pages/Provider/ProviderPage'
import HighOrderComponentPage from './pages/HighOrderComponent/HighOrderComponentPage'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path={PATTERN_PAGES_URLS.DEFAULT_COMPONENT} element={<DefaultPage />} />
      <Route path={PATTERN_PAGES_URLS.COMPOUND_COMPONENT} element={<CompoundPage />} />
      <Route path={PATTERN_PAGES_URLS.CONTEXT_COMPONENT} element={<ContextPage />} />
      <Route path={PATTERN_PAGES_URLS.RENDER_PROPS} element={<RenderProps />} />
      <Route path={PATTERN_PAGES_URLS.PROPS_COLLECTION} element={<PropsCollection />} />
      <Route path={PATTERN_PAGES_URLS.PROPS_GETTER} element={<PropsGetter />} />
      <Route path={PATTERN_PAGES_URLS.STATE_INITIALIZERS} element={<StateInitializers />} />
      <Route path={PATTERN_PAGES_URLS.STATE_REDUCERS} element={<StateReducer />} />
      <Route path={PATTERN_PAGES_URLS.CONTROLLED_PROPS} element={<ControlledProps />} />
      <Route path={PATTERN_PAGES_URLS.PROVIDER_PATTERN} element={<ProviderPage />} />
      <Route path={PATTERN_PAGES_URLS.HOC} element={<HighOrderComponentPage />} />
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
