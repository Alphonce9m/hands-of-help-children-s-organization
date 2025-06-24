/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare module 'next' {
  export * from 'next/types';
  export { default } from 'next/types';
}

declare module 'next/dynamic' {
  import { ComponentType } from 'react';
  
  interface DynamicOptions {
    ssr?: boolean;
    loading?: () => React.ReactNode | null;
    loader?: () => Promise<ComponentType<any>>;
  }
  
  const dynamic: <P = {}>(
    loader: () => Promise<{ default: ComponentType<P> }>,
    options?: DynamicOptions
  ) => ComponentType<P>;
  
  export default dynamic;
}

declare module 'next/server' {
  export * from 'next/server';
  export { default } from 'next/server';
}

declare module 'next-auth' {
  export * from 'next-auth';
  export { default } from 'next-auth';
}

declare module 'next-auth/react' {
  export * from 'next-auth/react';
  export { default } from 'next-auth/react';
}

declare module 'next/link' {
  import { LinkProps } from 'next/dist/client/link';
  const Link: React.FC<LinkProps>;
  export default Link;
}

declare module 'next/image' {
  import { ImageProps } from 'next/image';
  const Image: React.FC<ImageProps>;
  export default Image;
}

declare module 'framer-motion' {
  export * from 'framer-motion';
  export { default } from 'framer-motion';
}
