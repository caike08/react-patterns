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
import ProxyComponentPage from './pages/ProxyComponent/ProxyComponentPage'
import ControlledFormPage from './pages/ControlledForm/ControlledFormPage'
import UncontrolledFormPage from './pages/UncontrolledForm/UncontrolledFormPage'
import ComponentInjectionPage from './pages/ComponentInjection/ComponentInjectionPage'
import ForwardRefHookPage from './pages/ForwardRefHook/ForwardRefHookPage'
import UseImperativeHandlePage from './pages/UseImperativeHandleHook/UseImperativeHandleHookPage'
import UseCallbackHookPage from './pages/UseCallbackHook/UseCallbackHookPage'
import UseReducerHookPage from './pages/UseReducerHook/UseReducerHookPage'
import UseTransitionHookPage from './pages/UseTransitionHook/UseTransitionHookPage'

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
      <Route path={PATTERN_PAGES_URLS.PROXY_COMPONENT} element={<ProxyComponentPage />} />
      <Route path={PATTERN_PAGES_URLS.CONTROLLED_COMPONENTS} element={<ControlledFormPage />} />
      <Route path={PATTERN_PAGES_URLS.UNCONTROLLED_COMPONENTS} element={<UncontrolledFormPage />} />
      <Route path={PATTERN_PAGES_URLS.COMPONENT_INJECTION} element={<ComponentInjectionPage />} />
      <Route path={PATTERN_PAGES_URLS.FORWARD_REF_HOOK} element={<ForwardRefHookPage />} />
      <Route path={PATTERN_PAGES_URLS.USE_IMPERATIVE_HANDLE_HOOK} element={<UseImperativeHandlePage />} />
      <Route path={PATTERN_PAGES_URLS.USE_CALLBACK_HOOK} element={<UseCallbackHookPage />} />
      <Route path={PATTERN_PAGES_URLS.USE_REDUCER_HOOK} element={<UseReducerHookPage />} />
      <Route path={PATTERN_PAGES_URLS.USE_TRANSITION_HOOK} element={<UseTransitionHookPage />} />
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
