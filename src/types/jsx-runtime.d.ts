declare module 'react/jsx-runtime' {
  import React from 'react';

  export const Fragment: React.FragmentType;
  export const jsx: typeof React.jsx;
  export const jsxs: typeof React.jsxs;
  export const jsxDEV: typeof React.jsxDEV;
  export const createElement: typeof React.createElement;
  export const cloneElement: typeof React.cloneElement;
  export const isValidElement: typeof React.isValidElement;
  export const Children: typeof React.Children;
  export const Component: typeof React.Component;
  export const PureComponent: typeof React.PureComponent;
  export const useState: typeof React.useState;
  export const useEffect: typeof React.useEffect;
  export const useRef: typeof React.useRef;
  export const useMemo: typeof React.useMemo;
  export const useCallback: typeof React.useCallback;
  export const useContext: typeof React.useContext;
  export const useReducer: typeof React.useReducer;
  export const useImperativeHandle: typeof React.useImperativeHandle;
  export const useLayoutEffect: typeof React.useLayoutEffect;
  export const useDebugValue: typeof React.useDebugValue;
  export const useDeferredValue: typeof React.useDeferredValue;
  export const useTransition: typeof React.useTransition;
  export const useId: typeof React.useId;
  export const useSyncExternalStore: typeof React.useSyncExternalStore;
  export const useInsertionEffect: typeof React.useInsertionEffect;
  export const useCacheRefresh: typeof React.useCacheRefresh;
  export const Suspense: typeof React.Suspense;
  export const SuspenseList: typeof React.SuspenseList;
  export const lazy: typeof React.lazy;
  export const memo: typeof React.memo;
  export const forwardRef: typeof React.forwardRef;
}
