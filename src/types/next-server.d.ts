import { NextResponse as OriginalNextResponse } from 'next/server';

declare module 'next/server' {
  // Re-export the NextResponse type with the correct type
  export const NextResponse: typeof OriginalNextResponse & {
    json: <T>(body: T, init?: ResponseInit) => Response;
    redirect: (url: string | URL, init?: number | ResponseInit) => Response;
    rewrite: (url: string | URL, init?: ResponseInit) => Response;
    next: (init?: ResponseInit) => Response;
  };

  // Export other server types
  export * from 'next/types';
  export * from 'next/dist/server/web/spec-extension/response';
  export * from 'next/dist/server/web/spec-extension/request';
  export * from 'next/dist/server/web/spec-extension/next-url';
  export * from 'next/dist/server/web/spec-extension/user-agent';
  export * from 'next/dist/server/web/spec-extension/cookies';
  export * from 'next/dist/server/web/spec-extension/adapters';
  export * from 'next/dist/server/web/spec-extension/types';
  export * from 'next/dist/server/web/spec-extension/response';
  export * from 'next/dist/server/web/spec-extension/request';
  export * from 'next/dist/server/web/spec-extension/next-url';
  export * from 'next/dist/server/web/spec-extension/user-agent';
  export * from 'next/dist/server/web/spec-extension/cookies';
  export * from 'next/dist/server/web/spec-extension/adapters';
  export * from 'next/dist/server/web/spec-extension/types';
}

// Make sure TypeScript knows about the global NextResponse
declare global {
  const NextResponse: typeof import('next/server').NextResponse;
}

// This ensures the file is treated as a module
export {};
