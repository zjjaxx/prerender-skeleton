// src/renderComplate.ts
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
export {
  dispatchRenderEvent
};
//# sourceMappingURL=renderComplate.mjs.map