import { generatePrerenderHtml } from "./core/generate";
import { PrerenderSkeletonOption} from "./types/index"
import type { Plugin } from "vite";

import Render from "./core/render/index";
export default function PrerenderSkeleton(
  options: PrerenderSkeletonOption
): Plugin{
  return {
    name:"rollup-plugin-prerender-skeleton",
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
        await generatePrerenderHtml(options)
      },
  };
}
PrerenderSkeleton.Render=Render

