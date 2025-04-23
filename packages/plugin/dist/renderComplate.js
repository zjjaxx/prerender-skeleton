"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/renderComplate.ts
var renderComplate_exports = {};
__export(renderComplate_exports, {
  dispatchRenderEvent: () => dispatchRenderEvent
});
module.exports = __toCommonJS(renderComplate_exports);
var dispatchRenderEvent = (eventName, appId = "app") => {
  if (window.__inPuppeteer__) {
    setTimeout(() => {
      document.dispatchEvent(new Event(eventName));
    }, 0);
  } else {
    const skeletonElement = document.getElementById("__skeleton_clone");
    if (skeletonElement && skeletonElement.parentNode) {
      skeletonElement.parentNode.removeChild(skeletonElement);
      const appElement = document.getElementById(appId);
      if (appElement) {
        appElement.style.visibility = "visible";
      }
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dispatchRenderEvent
});
//# sourceMappingURL=renderComplate.js.map