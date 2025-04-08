"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => PrerenderSkeleton
});
module.exports = __toCommonJS(index_exports);

// src/core/generate.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var mkdirp = __toESM(require("mkdirp"));
var import_prerenderer = __toESM(require("@prerenderer/prerenderer"));
var generatePrerenderHtml = (options) => {
  const prerenderer = new import_prerenderer.default(options);
  prerenderer.initialize().then(() => {
    const routes = options.routes.map((item) => item.path);
    return prerenderer.renderRoutes(routes);
  }).then((renderedRoutes) => {
    renderedRoutes.forEach((renderedRoute) => {
      try {
        const outputDir = import_path.default.join(__dirname, "app", renderedRoute.route);
        const outputFile = `${outputDir}/index.html`;
        mkdirp.sync(outputDir);
        import_fs.default.writeFileSync(outputFile, renderedRoute.html.trim());
      } catch (e) {
      }
    });
    return prerenderer.destroy();
  }).catch((err) => {
    return prerenderer.destroy();
  });
};

// src/index.ts
var import_renderer_puppeteer = __toESM(require("@prerenderer/renderer-puppeteer"));
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
PrerenderSkeleton.Render = import_renderer_puppeteer.default;
//# sourceMappingURL=index.js.map