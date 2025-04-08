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
        const outputDir = path.join(__dirname, "app", renderedRoute.route);
        const outputFile = `${outputDir}/index.html`;
        mkdirp.sync(outputDir);
        fs.writeFileSync(outputFile, renderedRoute.html.trim());
      } catch (e) {
      }
    });
    return prerenderer.destroy();
  }).catch((err) => {
    return prerenderer.destroy();
  });
};

// src/index.ts
import Render from "@prerenderer/renderer-puppeteer";
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
PrerenderSkeleton.Render = Render;
export {
  PrerenderSkeleton as default
};
//# sourceMappingURL=index.mjs.map