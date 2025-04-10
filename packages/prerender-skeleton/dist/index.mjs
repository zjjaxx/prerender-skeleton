var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/core/generate.ts
import fs from "fs";
import path from "path";
import * as mkdirp from "mkdirp";
import Prerenderer from "@prerenderer/prerenderer";
var generatePrerenderHtml = (options) => {
  const prerenderer = new Prerenderer(options);
  prerenderer.initialize().then(() => {
    const routes = options.routes.map((item) => item.path);
    return prerenderer.renderRoutes(routes);
  }).then((renderedRoutes) => {
    renderedRoutes.forEach((renderedRoute) => {
      try {
        const outputDir = path.join(options.staticDir, renderedRoute.route);
        const outputFile = `${outputDir}/index.html`;
        mkdirp.sync(outputDir);
        fs.writeFileSync(outputFile, renderedRoute.html.trim());
      } catch (e) {
        console.log("error", e);
      }
    });
    return prerenderer.destroy();
  }).catch((err) => {
    console.log(err.message, err.stack);
    return prerenderer.destroy();
  });
};

// src/core/render/renderer.ts
import promiseLimit from "promise-limit";
import puppeteer from "puppeteer";

// src/core/render/options.ts
var defaultOptions = {
  headless: true,
  injectProperty: "__PRERENDER_INJECTED",
  maxConcurrentRoutes: 0,
  timeout: 1e3 * 30
  // 30 sec timeout by default
};
var schema = {
  type: "object",
  additionalProperties: true,
  properties: {
    launchOptions: {
      type: "object",
      additionalProperties: true,
      nullable: true
    },
    headless: {
      type: "boolean",
      description: "Set to true if you want to the browser to open when rendering",
      nullable: true
    },
    maxConcurrentRoutes: {
      type: "number",
      nullable: true
    },
    renderAfterDocumentEvent: {
      type: "string",
      description: "The name of the event that should trigger the rendering of the page",
      nullable: true
    },
    renderAfterElementExists: {
      type: "string",
      description: "Wait until this selector is found on the page",
      nullable: true
    },
    elementVisible: {
      type: "boolean",
      nullable: true,
      description: "If this is true, the renderAfterElementExists must be visible on the page to trigger the render"
    },
    elementHidden: {
      type: "boolean",
      nullable: true,
      description: "If this is false, the renderAfterElementExists must be hidden on the page to trigger the render"
    },
    renderAfterTime: {
      type: "number",
      description: "Time to wait for in ms before rendering the page",
      nullable: true
    },
    timeout: {
      type: "number",
      description: "The time in ms after which we should stop waiting and throw an error",
      nullable: true
    },
    injectProperty: {
      type: "string",
      description: "The key of the injected value into window",
      nullable: true
    },
    args: {
      type: "array",
      description: "List of CLI arguments to launch puppeteer with",
      items: {
        type: "string"
      },
      nullable: true
    },
    pageHandler: {
      instanceOf: "Function",
      description: "A custom handler to use the puppeteer api when opening the page"
    },
    pageSetup: {
      instanceOf: "Function",
      description: "A custom handler that can be used to register interceptors on the page"
    },
    skipThirdPartyRequests: {
      type: "boolean",
      description: "Setting this option to true will ignore all requests to external urls",
      nullable: true
    },
    consoleHandler: {
      instanceOf: "Function",
      description: "A custom handler for console messages happening on the page"
    },
    viewport: {
      type: "object",
      additionalProperties: true,
      // If ever options are added
      required: ["height", "width"],
      nullable: true,
      properties: {
        width: {
          type: "number",
          description: "The page width in pixels."
        },
        height: {
          type: "number",
          description: "The page height in pixels."
        },
        deviceScaleFactor: {
          type: "number",
          description: "Specify device scale factor. See https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio for more info.",
          nullable: true
        },
        isMobile: {
          type: "boolean",
          description: "Whether the `meta viewport` tag is taken into account.",
          nullable: true
        },
        isLandscape: {
          type: "boolean",
          description: "Specifies if the viewport is in landscape mode.",
          nullable: true
        },
        hasTouch: {
          type: "boolean",
          description: "Specify if the viewport supports touch events.",
          nullable: true
        }
      }
    },
    navigationOptions: {
      type: "object",
      nullable: true,
      properties: {
        timeout: {
          type: "number",
          nullable: true
        },
        waitUntil: {
          type: "null",
          nullable: true,
          anyOf: [
            {
              type: "string",
              enum: ["load", "domcontentloaded", "networkidle0", "networkidle2"]
            },
            {
              type: "array",
              items: {
                type: "string",
                enum: ["load", "domcontentloaded", "networkidle0", "networkidle2"]
              }
            }
          ]
        }
      }
    }
  }
};

// src/core/render/waitForRender.ts
var listenForRender = (options) => {
  if (options.renderAfterDocumentEvent) {
    window.__PRERENDER_STATUS = {};
    document.addEventListener(options.renderAfterDocumentEvent, () => {
      window.__PRERENDER_STATUS = window.__PRERENDER_STATUS || {};
      window.__PRERENDER_STATUS._DOCUMENT_EVENT_RESOLVED = true;
    });
  }
};
var waitForRender = (options) => {
  const timeout = options.timeout;
  const event = options.renderAfterDocumentEvent;
  return new Promise((resolve) => {
    let fallback = true;
    if (event) {
      fallback = false;
      let tim = null;
      if (timeout) {
        tim = setTimeout(() => {
          const timeS = Math.round(timeout / 100) / 10;
          resolve(`Could not prerender: event '${event}' did not occur within ${timeS}s`);
        }, timeout);
      }
      if (window.__PRERENDER_STATUS && window.__PRERENDER_STATUS._DOCUMENT_EVENT_RESOLVED) {
        resolve();
      }
      document.addEventListener(event, () => {
        tim && clearTimeout(tim);
        resolve();
      });
    }
    if (options.renderAfterElementExists) {
      fallback = false;
    }
    if (options.renderAfterTime) {
      fallback = false;
      setTimeout(() => resolve(), options.renderAfterTime);
    }
    if (fallback) {
      resolve();
    }
  });
};

// src/core/render/renderer.ts
import { validate } from "schema-utils";
import { merge as deepMerge } from "ts-deepmerge";
var PuppeteerRenderer = class {
  constructor(options = {}) {
    validate(schema, options, {
      name: "Renderer Puppeteer",
      baseDataPath: "options"
    });
    this.options = deepMerge(defaultOptions, options);
    if (options.renderAfterTime && this.options.timeout < options.renderAfterTime) {
      this.options.timeout = options.renderAfterTime + 1e3;
    }
  }
  initialize() {
    return __async(this, null, function* () {
      if (process.platform === "linux") {
        if (!this.options.args) this.options.args = [];
        if (this.options.args.indexOf("--no-sandbox") === -1) {
          this.options.args.push("--no-sandbox");
          this.options.args.push("--disable-setuid-sandbox");
        }
      }
      const cleanup = () => void this.destroy();
      process.on("SIGTERM", cleanup);
      process.on("SIGINT", cleanup);
      process.on("uncaughtException", cleanup);
      const _a = this.options, {
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
        renderAfterDocumentEvent
      } = _a, legacyOptions = __objRest(_a, [
        "maxConcurrentRoutes",
        "inject",
        "injectProperty",
        "timeout",
        "args",
        "headless",
        "pageSetup",
        "pageHandler",
        "consoleHandler",
        "viewport",
        "navigationOptions",
        "launchOptions",
        "renderAfterTime",
        "renderAfterElementExists",
        "elementHidden",
        "elementVisible",
        "skipThirdPartyRequests",
        "renderAfterDocumentEvent"
      ]);
      if (!launchOptions) {
        if (Object.keys(legacyOptions).length > 1) {
          console.warn('You are passing options to puppeteer launch using root options, which has been deprecated put them in "launchOptions" instead [Affected: ' + Object.keys(legacyOptions).join(",") + "]");
        }
      }
      this.puppeteer = yield puppeteer.launch(__spreadValues({ headless: headless ? "new" : false, args }, launchOptions || legacyOptions));
    });
  }
  handleRequestInterception(page, baseURL) {
    return __async(this, null, function* () {
      yield page.setRequestInterception(true);
      page.on("request", (req) => {
        if (this.options.skipThirdPartyRequests) {
          if (!req.url().startsWith(baseURL)) {
            void req.abort();
            return;
          }
        }
        void req.continue();
      });
    });
  }
  renderRoutes(routes, prerenderer) {
    const rootOptions = prerenderer.getOptions();
    const baseURL = `http://${rootOptions.server.host}:${rootOptions.server.port}`;
    const limiter = promiseLimit(this.options.maxConcurrentRoutes);
    return Promise.all(
      routes.map(
        (route) => limiter(() => this.getPageContent(baseURL, route))
      )
    );
  }
  getPageContent(baseURL, route) {
    return __async(this, null, function* () {
      const options = this.options;
      const page = yield this.puppeteer.newPage();
      try {
        if (options.consoleHandler) {
          const handler = options.consoleHandler;
          page.on("console", (message) => handler(route, message));
        }
        if (options.inject) {
          yield page.evaluateOnNewDocument(`(function () { window['${options.injectProperty}'] = ${JSON.stringify(options.inject)}; })();`);
        }
        if (options.viewport) yield page.setViewport(options.viewport);
        yield this.handleRequestInterception(page, baseURL);
        options.pageSetup && (yield options.pageSetup(page, route));
        if (options.renderAfterDocumentEvent) {
          yield page.evaluateOnNewDocument(listenForRender, options);
        }
        const navigationOptions = __spreadValues({
          waituntil: "networkidle0",
          timeout: options.timeout
        }, options.navigationOptions);
        yield page.goto(`${baseURL}${route}`, navigationOptions);
        options.pageHandler && (yield options.pageHandler(page, route));
        const prs = [];
        if (options.renderAfterElementExists) {
          const elem = options.renderAfterElementExists;
          prs.push((() => __async(this, null, function* () {
            try {
              yield page.waitForSelector(elem, {
                timeout: options.timeout,
                hidden: options.elementHidden,
                visible: options.elementVisible
              });
            } catch (e) {
              yield page.close();
              const timeS = Math.round(options.timeout / 100) / 10;
              throw new Error(`Could not prerender: element '${elem}' did not appear within ${timeS}s`);
            }
          }))());
        }
        prs.push(page.evaluate(waitForRender, options));
        const res = yield Promise.race(prs);
        if (res) {
          throw new Error(res);
        }
        const result = {
          originalRoute: route,
          route: yield page.evaluate("window.location.pathname"),
          html: yield page.content()
        };
        return result;
      } finally {
        yield page.close();
      }
    });
  }
  destroy() {
    return __async(this, null, function* () {
      if (this.puppeteer) {
        yield this.puppeteer.close();
      }
    });
  }
};

// src/core/render/index.ts
var render_default = PuppeteerRenderer;

// src/index.ts
function PrerenderSkeleton(options) {
  return {
    name: "rollup-plugin-prerender-skeleton",
    apply: "build",
    enforce: "post",
    closeBundle() {
      return __async(this, null, function* () {
        yield generatePrerenderHtml(options);
      });
    }
  };
}
PrerenderSkeleton.Render = render_default;
export {
  PrerenderSkeleton as default
};
//# sourceMappingURL=index.mjs.map