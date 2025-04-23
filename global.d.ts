import type { PrerendererOptions } from "@prerenderer/prerenderer";
declare global {
  type PrerenderSkeletonOption = {
    routes: {
      path: string;
      skeleton: boolean;
      debug?: boolean;
      animation?: true;
      appId?: string;
      minGrayBlockWidth?: number;
      minGrayPseudoWidth?: number;
    }[];
  } & PrerendererOptions;
  var SkeletonRender=any
  interface Window{
    __inPuppeteer__:boolean
  }
}
