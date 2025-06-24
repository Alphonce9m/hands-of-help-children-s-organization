import { ComponentType } from 'react';

declare module 'next/dynamic' {
  type ComponentType<P = {}> = React.ComponentType<P>;

  interface DynamicOptions<P = {}> {
    ssr?: boolean;
    loading?: (() => React.ReactNode) | null;
    loader?: () => Promise<{ default: ComponentType<P> } | ComponentType<P>>;
  }

  function dynamic<P = {}>(
    loader: () => Promise<{ default: ComponentType<P> } | ComponentType<P>>,
    options?: DynamicOptions<P>
  ): ComponentType<P>;

  export default dynamic;
}
