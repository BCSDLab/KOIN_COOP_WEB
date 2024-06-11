import 'vite/client';
import 'react-dom';
import 'vite-plugin-svgr/client';

import * as React from 'react';

import { z } from 'zod';

const envVar = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production']),
  VITE_PUBLIC_URL: z.string(),
  VITE_REACT_APP_API_PATH: z.string(),
});

export type EnvVar = z.infer<typeof envVar>;

declare global {
  interface ImportMetaEnv extends EnvVar {}
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<React.SVGProps<
  SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
