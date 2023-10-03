import type { PageTypeList } from '../types/pages.types'

export const enum PATTERN_PAGES_URLS {
  // react patterns
  DEFAULT_COMPONENT = '/1-default-component',
  COMPOUND_COMPONENT = '/2-compound-component',
  CONTEXT_COMPONENT = '/3-context-component',
  RENDER_PROPS = '/4-render-props',
  PROPS_COLLECTION = '/5-props-collection',
  PROPS_GETTER = '/6-props-getter',
  STATE_INITIALIZERS = '/7-state-initializers',
  STATE_REDUCERS = '/8-state-reducers',
  CONTROLLED_PROPS = '/9-controlled-props',
  PROVIDER_PATTERN = '/10-provider-pattern',
  HOC = '/11-hoc',
  // bonus
  PROXY_COMPONENT = '/21-proxy-component',
  CONTROLLED_COMPONENTS = '/22-controlled-components',
  UNCONTROLLED_COMPONENTS = '/23-uncontrolled-components',
  COMPONENT_INJECTION = '/24-component-injection',
  // hooks
  FORWARD_REF_HOOK = '/26-forward-ref',
  USE_IMPERATIVE_HANDLE_HOOK = '/27-use-imperative-handle',
  USE_CALLBACK_HOOK = '/28-use-callback',
  USE_REDUCER_HOOK = '/32-use-reducer',
  USE_TRANSITION_HOOK = '/36-use-transition',
}

export const PATTERN_PAGES: PageTypeList = [
  {
    title: 'Default component',
    path: PATTERN_PAGES_URLS.DEFAULT_COMPONENT,
  },
  {
    title: 'Compound component',
    path: PATTERN_PAGES_URLS.COMPOUND_COMPONENT,
  },
  {
    title: 'React context',
    path: PATTERN_PAGES_URLS.CONTEXT_COMPONENT,
  },
  {
    title: 'Render Props',
    path: PATTERN_PAGES_URLS.RENDER_PROPS,
  },
  {
    title: 'Props collection',
    path: PATTERN_PAGES_URLS.PROPS_COLLECTION,
  },
  {
    title: 'Prop Getters',
    path: PATTERN_PAGES_URLS.PROPS_GETTER,
  },
  {
    title: 'State Initializers',
    path: PATTERN_PAGES_URLS.STATE_INITIALIZERS,
  },
  {
    title: 'State Reducers',
    path: PATTERN_PAGES_URLS.STATE_REDUCERS,
  },
  {
    title: 'Controlled Props',
    path: PATTERN_PAGES_URLS.CONTROLLED_PROPS,
  },
  {
    title: 'Provider Pattern',
    path: PATTERN_PAGES_URLS.PROVIDER_PATTERN,
  },
  {
    title: 'High Order Components',
    path: PATTERN_PAGES_URLS.HOC,
  }
]

export const BONUSES_PAGES: PageTypeList = [
  {
    title: 'Proxy Component',
    path: PATTERN_PAGES_URLS.PROXY_COMPONENT,
  },
  {
    title: 'Controlled Components (submit form)',
    path: PATTERN_PAGES_URLS.CONTROLLED_COMPONENTS,
  },
  {
    title: 'Uncontrolled Components (submit form)',
    path: PATTERN_PAGES_URLS.UNCONTROLLED_COMPONENTS,
  },
  {
    title: 'Component Injection',
    path: PATTERN_PAGES_URLS.COMPONENT_INJECTION,
  }
]

export const HOOKS_PAGES: PageTypeList = [
  {
    title: 'React forwardRef hook',
    path: PATTERN_PAGES_URLS.FORWARD_REF_HOOK,
  },
  {
    title: 'React useImperativeHandle hook',
    path: PATTERN_PAGES_URLS.USE_IMPERATIVE_HANDLE_HOOK,
  },
  {
    title: 'React useCallback hook',
    path: PATTERN_PAGES_URLS.USE_CALLBACK_HOOK,
  },
  {
    title: 'React useReducer hook',
    path: PATTERN_PAGES_URLS.USE_REDUCER_HOOK,
  },
  {
    title: 'React useTransition hook',
    path: PATTERN_PAGES_URLS.USE_TRANSITION_HOOK,
  },
]
