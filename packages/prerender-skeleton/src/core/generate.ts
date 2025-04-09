import fs from "fs";
import path from "path";
import * as mkdirp from "mkdirp";
import Prerenderer from "@prerenderer/prerenderer";
// Make sure you install a renderer as well!
import { PrerenderSkeletonOption} from "../types/index"


export const generatePrerenderHtml = (options:PrerenderSkeletonOption) => {
  const prerenderer = new Prerenderer(options);
  prerenderer
    .initialize()
    .then(() => {
      // List of routes to render.
      const routes=options.routes.map(item=>item.path)
      return prerenderer.renderRoutes(routes);
    })
    .then((renderedRoutes) => {
      // renderedRoutes is an array of objects in the format:
      // {
      //   route: String (The route rendered)
      //   html: String (The resulting HTML)
      // }
      renderedRoutes.forEach((renderedRoute) => {
        try {
          // A smarter implementation would be required, but this does okay for an example.
          // Don't copy this directly!!!
          const outputDir = path.join(options.staticDir,renderedRoute.route);
          const outputFile = `${outputDir}/index.html`;

          mkdirp.sync(outputDir);
          fs.writeFileSync(outputFile, renderedRoute.html.trim());
        } catch (e) {
          console.log("error",e)
          // Handle errors.
        }
      });

      // Shut down the file server and renderer.
      return prerenderer.destroy();
    })
    .catch((err) => {
      console.log(err.message,err.stack)
      
      // Shut down the server and renderer.
      return prerenderer.destroy();
      // Handle errors.
    });
};
// Initialize is separate from the constructor for flexibility of integration with build systems.
