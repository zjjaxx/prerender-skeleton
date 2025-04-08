import type { PrerendererOptions } from "@prerenderer/prerenderer";
export type PrerenderSkeletonOption = {
  routes: {
    path: string;
    skeleton: boolean;
    debug?: boolean;
    animation?: true;
  }[];
} & PrerendererOptions;
export {}
