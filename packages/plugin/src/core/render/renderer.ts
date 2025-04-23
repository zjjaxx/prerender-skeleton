import Prerenderer, {
  IRenderer,
  RenderedRoute,
} from "@prerenderer/prerenderer";
// import SkeletonRender  from "@prerender_skeleton/skeleton"
import path from "path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import promiseLimit from "promise-limit";
import puppeteer, { Browser, Page } from "puppeteer";
import {
  PuppeteerRendererFinalOptions,
  PuppeteerRendererOptions,
  schema,
  defaultOptions,
} from "./options";
import { waitForRender, listenForRender } from "./waitForRender";
import { validate } from "schema-utils";
import { merge as deepMerge } from "ts-deepmerge";
// @ts-ignore
import { createRequire } from "module";

export default class PuppeteerRenderer implements IRenderer {
  private puppeteer!: Browser;
  private rootOptions!: PrerenderSkeletonOption;
  private readonly options: PuppeteerRendererFinalOptions;

  constructor(options: PuppeteerRendererOptions = {}) {
    validate(schema, options, {
      name: "Renderer Puppeteer",
      //当验证失败时，schema-utils 会抛出错误，提示哪个字段不符合预期。baseDataPath 会作为错误信息中字段路径的“基路径”
      // 如果验证的配置对象是 { timeout: "100" }（但 timeout 应为数字），且 baseDataPath 设为 'options'，错误信息会是：
      // Invalid options object: options.timeout should be a number.
      baseDataPath: "options",
    });

    this.options = deepMerge(
      defaultOptions,
      options
    ) as PuppeteerRendererFinalOptions;

    if (
      options.renderAfterTime &&
      this.options.timeout < options.renderAfterTime
    ) {
      this.options.timeout = options.renderAfterTime + 1000;
    }
  }

  async initialize() {
    // Workaround for Linux SUID Sandbox issues.
    if (process.platform === "linux") {
      if (!this.options.args) this.options.args = [];

      if (this.options.args.indexOf("--no-sandbox") === -1) {
        this.options.args.push("--no-sandbox");
        this.options.args.push("--disable-setuid-sandbox");
      }
    }

    // Puppeteer tends to stay alive if the program exits unexpectedly, try to handle this and cleanup
    const cleanup = () => void this.destroy();
    process.on("SIGTERM", cleanup);
    process.on("SIGINT", cleanup);

    process.on("uncaughtException", cleanup);

    // Previously the whole option object was passed to `launch` which was not the best idea
    // We do a bit of backward compatibility here
    // TODO use an explicit list of legacyOptions rather than excluding the list of existing options
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      maxConcurrentRoutes,
      inject,
      injectProperty,
      timeout,
      args,
      headless,
      pageSetup,
      pageHandler,
      consoleHandler,
      viewport,
      navigationOptions,
      launchOptions,
      renderAfterTime,
      renderAfterElementExists,
      elementHidden,
      elementVisible,
      skipThirdPartyRequests,
      renderAfterDocumentEvent,
      ...legacyOptions
    } = this.options;
    /* eslint-enable */
    if (!launchOptions) {
      if (Object.keys(legacyOptions).length > 1) {
        console.warn(
          'You are passing options to puppeteer launch using root options, which has been deprecated put them in "launchOptions" instead [Affected: ' +
            Object.keys(legacyOptions).join(",") +
            "]"
        );
      }
    }
    this.puppeteer = await puppeteer.launch({
      headless: headless ? "new" : false,
      protocolTimeout:
      args,
      ...(launchOptions || legacyOptions),
    });
  }

  async handleRequestInterception(page: Page, baseURL: string) {
    await page.setRequestInterception(true);

    page.on("request", (req) => {
      // Skip third party requests if needed.
      if (this.options.skipThirdPartyRequests) {
        if (!req.url().startsWith(baseURL)) {
          void req.abort();
          return;
        }
      }

      void req.continue();
    });
  }

  renderRoutes(routes: Array<string>, prerenderer: Prerenderer) {
    this.rootOptions =
      prerenderer.getOptions() as unknown as PrerenderSkeletonOption;
    const baseURL = `http://${this.rootOptions.server?.host}:${this.rootOptions.server?.port}`;

    const limiter = promiseLimit<RenderedRoute>(
      this.options.maxConcurrentRoutes
    );

    return Promise.all(
      routes.map((route) => limiter(() => this.getPageContent(baseURL, route)))
    );
  }

  private async getPageContent(baseURL: string, route: string) {
    const options = this.options;
    const page = await this.puppeteer.newPage();
    try {
      if (options.consoleHandler) {
        const handler = options.consoleHandler;
        page.on("console", (message) => handler(route, message));
      }
      await page.evaluateOnNewDocument(
        `(function () { window.__inPuppeteer__= true; })();`
      );
      if (options.inject) {
        await page.evaluateOnNewDocument(
          `(function () { window['${
            options.injectProperty
          }'] = ${JSON.stringify(options.inject)}; })();`
        );
      }
      // Allow setting viewport widths and such.
      if (options.viewport) await page.setViewport(options.viewport);

      await this.handleRequestInterception(page, baseURL);

      options.pageSetup && (await options.pageSetup(page, route));

      // Hack just in-case the document event fires before our main listener is added.
      if (options.renderAfterDocumentEvent) {
        await page.evaluateOnNewDocument(listenForRender, options);
      }

      const navigationOptions = {
        waituntil: "networkidle0",
        timeout: options.timeout,
        ...options.navigationOptions,
      };
      await page.goto(`${baseURL}${route}`, navigationOptions);

      options.pageHandler && (await options.pageHandler(page, route));

      const prs: Array<Promise<void | string>> = [];
      // Wait for some specific element exists
      if (options.renderAfterElementExists) {
        const elem = options.renderAfterElementExists;
        prs.push(
          (async () => {
            try {
              await page.waitForSelector(elem, {
                timeout: options.timeout,
                hidden: options.elementHidden,
                visible: options.elementVisible,
              });
            } catch (e) {
              await page.close();
              const timeS = Math.round(options.timeout / 100) / 10;
              throw new Error(
                `Could not prerender: element '${elem}' did not appear within ${timeS}s`
              );
            }
          })()
        );
      }

      prs.push(page.evaluate(waitForRender, options));

      const res = await Promise.race(prs);
      if (res) {
        throw new Error(res);
      }
      // @ts-ignore
      const require = createRequire(import.meta.url);
      const modulePath = require.resolve("@prerender_skeleton/skeleton");
      const distDir = path.dirname(modulePath);
      const fileContent = await readFile(
        path.join(distDir, "skeleton.global.js"),
        "utf8"
      );
      await page.addScriptTag({ content: fileContent });

      const optionItem = this.rootOptions?.routes.find(
        (item) => item.path === route
      )!;

      await page.evaluate(async (optionItem) => {
        var skeletonRender = new SkeletonRender(optionItem);
        await skeletonRender.genSkeleton();
      }, optionItem);
      const result: RenderedRoute = {
        originalRoute: route,
        route: (await page.evaluate("window.location.pathname")) as string,
        html: await page.content(),
      };
      return result;
    } 
    catch(e){
      console.log("error",e)
      return {
        originalRoute: route,
        route: (await page.evaluate("window.location.pathname")) as string,
        html: await page.content(),
      }
    }
    finally {
      await page.close();
    }
  }

  async destroy() {
    if (this.puppeteer) {
      await this.puppeteer.close();
    }
  }
}
