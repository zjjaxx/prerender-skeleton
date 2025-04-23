import Prerenderer, { IRenderer, RenderedRoute } from '@prerenderer/prerenderer';
import { Page, ConsoleMessage, Viewport, WaitForOptions } from 'puppeteer';
import { Plugin } from 'vite';

interface PuppeteerRendererOptions {
    maxConcurrentRoutes?: number;
    renderAfterDocumentEvent?: string;
    renderAfterElementExists?: string;
    renderAfterTime?: number;
    timeout?: number;
    inject?: unknown;
    injectProperty?: string;
    skipThirdPartyRequests?: boolean;
    headless?: boolean;
    args?: string[];
    pageSetup?: (page: Page, route: string) => void | Promise<void>;
    pageHandler?: (page: Page, route: string) => void | Promise<void>;
    consoleHandler?: (route: string, message: ConsoleMessage) => void;
    viewport?: Viewport;
    launchOptions?: any;
    navigationOptions?: WaitForOptions;
    elementVisible?: boolean;
    elementHidden?: boolean;
}

declare class PuppeteerRenderer implements IRenderer {
    private puppeteer;
    private rootOptions;
    private readonly options;
    constructor(options?: PuppeteerRendererOptions);
    initialize(): Promise<void>;
    handleRequestInterception(page: Page, baseURL: string): Promise<void>;
    renderRoutes(routes: Array<string>, prerenderer: Prerenderer): Promise<RenderedRoute[]>;
    private getPageContent;
    destroy(): Promise<void>;
}

declare function PrerenderSkeleton(options: PrerenderSkeletonOption): Plugin;
declare namespace PrerenderSkeleton {
    var Render: typeof PuppeteerRenderer;
}

export { PrerenderSkeleton as default };
