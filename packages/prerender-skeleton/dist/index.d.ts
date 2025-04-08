import * as _prerenderer_renderer_puppeteer from '@prerenderer/renderer-puppeteer';
import { PrerendererOptions } from '@prerenderer/prerenderer';
import { Plugin } from 'vite';

type PrerenderSkeletonOption = {
    routes: {
        path: string;
        skeleton: boolean;
        debug?: boolean;
        animation?: true;
    }[];
} & PrerendererOptions;

declare function PrerenderSkeleton(options: PrerenderSkeletonOption): Plugin;
declare namespace PrerenderSkeleton {
    var Render: typeof _prerenderer_renderer_puppeteer.PuppeteerRenderer;
}

export { PrerenderSkeleton as default };
