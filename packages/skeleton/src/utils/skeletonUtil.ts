export const cloneElementWithUniqueIds = (
  element: HTMLElement,
  prefix = "__clone"
) => {
  // 深度克隆元素
  const clonedElement = element.cloneNode(true) as HTMLElement;
  // 递归更新克隆元素及其子元素的 i
  function updateIds(el: HTMLElement, parentPrefix: string) {
    if (el.id) {
      el.id = `${parentPrefix}-${el.id}`; // 为现有 id 添加前缀
    }
    Array.from(el.children).forEach((child, index) => {
      updateIds(child as HTMLElement, `${parentPrefix}-${index}`); // 子元素的前缀基于父元素
    });
  }
  updateIds(clonedElement, prefix); // 开始更新 id
  return clonedElement;
};
// Delete element
export const removeElement = (ele: HTMLElement) => {
  const parent = ele.parentNode;
  if (parent) {
    parent.removeChild(ele);
  }
};

// sleep function
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Check if the node is in the first screen
export const inViewPort = (ele: HTMLElement) => {
  try {
    const rect = ele.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.left < window.innerWidth;
  } catch (e) {
    return true;
  }
};

// Determine if the node has attributes
export const hasAttr = (ele: HTMLElement, attr: string) => {
  try {
    return ele.hasAttribute(attr);
  } catch (e) {
    return false;
  }
};

// Set node transparency
export const setOpacity = (ele: HTMLElement) => {
  if (ele.style) {
    // @ts-ignore
    ele.style.opacity = 0;
  }
};

// Unit conversion px -> rem
export const px2rem = (px: number | string) => {
  const pxValue = typeof px === "string" ? parseInt(px, 10) : px;
  const htmlElementFontSize = window.getComputedStyle(
    document.documentElement
  ).fontSize;

  return `${pxValue / parseInt(htmlElementFontSize, 10)}rem`;
};

export const emptyHandler = (node: HTMLElement) => {
  node.innerHTML = "";
  let classNameArr = (node.className && node.className.split(" ")) || [];
  classNameArr = classNameArr.map((item) => {
    return "." + item;
  });
  const className = classNameArr.join("");
  const id = node.id ? "#" + node.id : "";
  const query = className || id;

  if (!query) return;

  let styleSheet;

  for (const item of document.styleSheets) {
    if (!item.href) {
      styleSheet = item;
      break;
    }
  }

  try {
    styleSheet &&
      styleSheet.insertRule(
        `${query}::before{content:'' !important;background:none !important;}`,
        0
      );
    styleSheet &&
      styleSheet.insertRule(
        `${query}::after{content:'' !important;background:none !important;}`,
        0
      );
  } catch (e) {
    console.log("handleEmptyNode Error: ", JSON.stringify(e));
  }
};

// Check the element pseudo-class to return the corresponding element and width
export const checkHasPseudoEle = (ele: HTMLElement) => {
  if (!ele) return false;

  const beforeComputedStyle = window.getComputedStyle(ele, "::before");
  const beforeContent = beforeComputedStyle.getPropertyValue("content");
  const beforeWidth =
    parseFloat(beforeComputedStyle.getPropertyValue("width")) || 0;
  const hasBefore = beforeContent && beforeContent !== "none";

  const afterComputedStyle = window.getComputedStyle(ele, "::after");
  const afterContent = afterComputedStyle.getPropertyValue("content");
  const afterWidth =
    parseFloat(afterComputedStyle.getPropertyValue("width")) || 0;
  const hasAfter = afterContent && afterContent !== "none";

  const width = Math.max(beforeWidth, afterWidth);

  if (hasBefore || hasAfter) {
    return { hasBefore, hasAfter, ele, width };
  }
  return false;
};
export const isTextNode = (node:  HTMLElement | Node): node is Text => {
  return node.nodeType === Node.TEXT_NODE && node.nodeValue !== "";
};
export const isHtmlElement = (
  node: HTMLElement | Node
): node is HTMLElement => {
  return node.nodeType === Node.ELEMENT_NODE;
};
