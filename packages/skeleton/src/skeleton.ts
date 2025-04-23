import {
  cloneElementWithUniqueIds,
  removeElement,
  px2rem,
  sleep,
  hasAttr,
  inViewPort,
  setOpacity,
  emptyHandler,
  checkHasPseudoEle,
  isHtmlElement,
  isTextNode
} from "./utils/skeletonUtil";
const SKELETON_CLONE_CLASS = "skeleton_clone";
const MOCK_WRAPPER_ID = "skeleton-text-wrapper-id";
// Skeleton main color
const MAIN_COLOR = "#EEEEEE";
const MAIN_COLOR_RGB = "rgb(238, 238, 238)";
// Pseudo-class style
const PSEUDO_CLASS = "sk-pseudo";
const PSEUDO_CLASS_ANIMATION = "sk-pseudo-animation";
// button style
const BUTTON_CLASS = "sk-button";
// Transparent style
const TRANSPARENT_CLASS = "sk-transparent";
// Transparent 1 pixel image
const SMALLEST_BASE64 =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const IMG_BASE64_LARGE =
  "data:image/image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAopJREFUeF7tm1FyAyEIhs3JWk/W5mSmJ2tDRjtmBwUU3HXXPGUmG8P/gYJobu7ir9vF9TsWgBDCp3PuK8KC90d/3cFA7/03ZSgJIIQQnHMziMa03ikIVQBP7UAweZ6CedTPH/5JoWRcEcBJxCfdwOCBQZAAgAEgpNCBjuL+bL3Kp20xCmoAfjeiihSPIj7ZESHA2pVe/QC89+SCeSQQIYQ3B5bsZ0fAAiCIAKRuYOdlrSjaLQKIuoHMy1MDYKbOal6eFgBTPJmXzwTgVTdEQVBNsvLyzACKdYMkL2sAwKLRPA0ii99/4YQAgJ2aSV1Rmop7AKhNAZNsUFuHRgCAOZ6Xn7VoVgdALcLmAEAts3cwXHxsjqBTTr0UJjyhXgNQns/y7hgAMRJSKwrSX9o+q2+lK+Ih/b41coZMAY0Uxh2jJh7aYLvtBbgCep6jxMcoPOd2mCP+tAC44k8JQCJ+OIBSI/J5NvFD9eU5a4FU/FAAWJ2PiGouflrEDwPALUIyICIQreKHAGgQnwcGCaJHvDkAjnFMQCgIzvjU2mFWCEmNk4KQjl8CYQKgxzgmiJIecspsv6gOIPb3sJNikXENIETjJxAWADDvNBmX7Ripo/fm88gRAJrF5yRjRHxsu8a9J9HWAFTEUyt5z+eWAA4v3qQOiN6YQrwVgGnEmwCwOsjomee176qvAQuA0VHWigAjAmsKrEtS65ZY97nA9pJ088bEaJoXh9W6ILEFMPNV2WIRVzsdlpz3j3ay9PfkAGI5OfN/BRKkaglP3tNp6OBIvWP5PHkfgQSQdW/gLdXBsRTDHVt0H4EFgPvLMz63AMzoNU2bVwRo0pxxrBUBM3pN0+YVAZo0Zxzr8hHwB9VpX1/uYOP2AAAAAElFTkSuQmCC";
const IMG_BASE64_MID =
  "data:image/image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAT1JREFUWEftlm0OwyAIhu3JNk+29WRsJ9tKowapH4AxXbI26T+Fx5dXcHEnfwvPDwBP59zNOXefwLZ67zF++jKAkPwxITENmUFwgE9YeSAdhSKHe/lNhhivCOC9P5RmFAD3A8B+QBpfDMC8YVLIDFDxhhpiBCB5I5QCjZrVUlKiEQAI13IlAFktewCwyRivttoDoyWgyUdNuEu/GfnNG0pNAZIc9+3NTa1AT15Jcrz7Zg9YAOjJY+MxAwAASoc/Oh+lbH6l5OZGxA3Ua9W15CYAZiCMwSdk1oxaydUADRlxnPKJGcsSy5SGDa2V2APhqvWCFUHopONG0QDgXlGr1RhUAyBK3rsNZgV+8j2gPW1pvbgEf61AmvvSaSctDR3prWlYutvSHNJ19Wd5aJezIIrviCnPb6kUuO4CuBT4AqsEKzBFERGIAAAAAElFTkSuQmCC";
const IMG_BASE64_SMALL =
  "data:image/image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAMdJREFUOE+lU4ENwjAM8z7hE8gl8AnwCVyS8QmngKOkCt0yFai0Ve0Sx7GzCb5U9QCAz9ASkQsDJ75UlYc9gMdQNnB+x4qIzBmAN4YabOLcg3pBi18AJDZsx6qsANwAPCsAJpIi92vPwtlpfKtaYCtzXz0l30sGocFGsoRbixZYlRr6bo4wKFU2TSoRdwCOIVwEub0fglYAzdusOquvtGN25xZoCy9OI4O0OQe/AoT334yyzYjNQfofRggwps1IAxjN7OP+BngBsiWUEe5m32cAAAAASUVORK5CYII=";
const IMG_BG = "#dddddd";
// text class
const SKELETON_TEXT_CLASS = "skeleton-text-block-mark";
const IMG_CLASS_SMALL = "sk-img-small";
const IMG_CLASS_MID = "sk-img-mid";
const IMG_CLASS_LARGE = "sk-img-large";

const skeletonStyle = `

      .${SKELETON_CLONE_CLASS}{
        position:fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        z-index:1000000;
        width:100vw;
        height:100vh;
      }

      .${SKELETON_TEXT_CLASS},
      .${SKELETON_TEXT_CLASS} * {
        background-origin: content-box;
        background-clip: content-box;
        background-color: transparent;
        color: transparent !important;
        background-repeat: repeat-y;
      }
  
      .${PSEUDO_CLASS}::before,
      .${PSEUDO_CLASS}::after {
        background: ${MAIN_COLOR} !important;
        background-image: none !important;
        color: transparent !important;
        border-color: transparent !important;
      }
      .${PSEUDO_CLASS_ANIMATION}::before,
      .${PSEUDO_CLASS_ANIMATION}::after {
          animation: skeleton-opacity-animation 1.5s ease infinite !important;
      }
  
      .${BUTTON_CLASS} {
        box-shadow: none !important;
      }

      .${IMG_CLASS_SMALL}{
         background-image: url(${IMG_BASE64_SMALL}) !important;
         background-repeat:no-repeat !important;
         background-position: center !important;
      }
      .${IMG_CLASS_MID}{
         background-image: url(${IMG_BASE64_MID}) !important;
         background-repeat:no-repeat !important;
         background-position: center !important;
      }
      .${IMG_CLASS_LARGE}{
         background-image: url(${IMG_BASE64_LARGE}) !important;
         background-repeat:no-repeat !important;
         background-position: center !important;
      }
  
      .${TRANSPARENT_CLASS}::before,
      .${TRANSPARENT_CLASS}::after {
        opacity: 0 !important;
      }
      
      @keyframes skeleton-opacity-animation {
        0% {
          opacity: 1;
        }
        30% {
          opacity: 0.65;
        }
        100% {
         opacity: 1;
        }
      }
  
    `;
// List item Tag
const LIST_ITEM_TAG = ["LI", "DT", "DD"];
type SkeletonOption = PrerenderSkeletonOption["routes"][number];
export default class SkeletonRender {
  private options: Required<SkeletonOption>;
  constructor(options: SkeletonOption) {
    this.options = Object.assign(
      {
        debug: false,
        animation: true,
        appId: "app",
        minGrayBlockWidth: 30,
        minGrayPseudoWidth: 30,
      },
      options
    );
  }
  removeMock() {
    // 处理完成之后删除多余的10000px的 用来检测文本节点长度而生成的多余节点
    const getTextWidthElement = document.querySelector(`#${MOCK_WRAPPER_ID}`);
    if (getTextWidthElement) getTextWidthElement.remove();
  }
  async genSkeleton() {
    await this.startGenSkeleton();
    this.removeMock();
  }
  async startGenSkeleton() {
    const app = document.getElementById(this.options.appId);
    if (!app) {
      console.error("根元素没找到~");
      return false;
    }
    const newNode = cloneElementWithUniqueIds(app);
    newNode.id = "__skeleton_clone";
    newNode.classList.add(SKELETON_CLONE_CLASS);
    app.style.visibility = "hidden";
    document.body.prepend(newNode);
    // 初始化骨架屏样式
    this.styleHandler();
    try {
      this.handleNode(newNode);
    } catch (e) {
      if (e instanceof Error) {
        console.log("==genSkeleton Error==\n", e.message, e.stack);
      }
    }
  }
  // Initialization processing DOM
  styleHandler() {
    const skeletonBlockStyleEle = document.createElement("style");
    skeletonBlockStyleEle.innerText = skeletonStyle.replace(/\n/g, "");
    document.body.prepend(skeletonBlockStyleEle);
  }
  // Processing a single node
  handleNode(node: HTMLElement | Node) {
    if (!node) return;
    // 如果是文本节点
    if (isTextNode(node)) {
      const parent = node.parentNode as HTMLElement;
      // Determine if it has been processed
      if (!parent.classList.contains(SKELETON_TEXT_CLASS)) {
        // It is plain text itself and needs to be replaced with a node
        const textContent = node.textContent!.replace(/[\r\n]/g, "").trim();
        if (textContent) {
          const tmpNode = document.createElement("i");
          tmpNode.classList.add(SKELETON_TEXT_CLASS);
          tmpNode.innerHTML = textContent;
          node.parentNode!.replaceChild(tmpNode, node);
          this.textHandler(tmpNode);
          return true;
        }
      }
    }
    // 是元素节点
    else if (
      isHtmlElement(node)
    ) {
      // Delete elements that are not in first screen, or marked for deletion
      if (!inViewPort(node) || hasAttr(node, "data-skeleton-remove")) {
        return removeElement(node);
      }

      // Handling elements that are ignored by user tags -> End
      const ignore =
        hasAttr(node, "data-skeleton-ignore") || node.tagName === "STYLE";
      if (ignore) return;

      // 处理默认样式
      // 1. 有data-skeleton-empty属性的清空子元素，和伪类元素的背景色
      // 2 如果元素宽度小于最小宽度，则透明度设置为0
      // 3 如果有backgroundImage背景图片的话，则把背景图设置为none，设置默认背景色 ,如果配置options有动画属性，则给元素添加动画
      // 4 如果有阴影的话，替换为默认阴影
      // 5 如果有边框的话，替换为默认边框
      // 6 如果有自定义data-skeleton-bgcolor背景色的话，则设置自定义背景色，并把颜色color设置为透明，如果配置options有动画属性，则给元素添加动画
      this.beforeHandler(node);
      // 处理伪元素
      // 如果伪元素宽度小于最小宽度，则透明度设置为0，否则的话设置为默认背景色、背景图片为none、默认边框颜色、把颜色color设置为透明,如果配置options有动画属性，则给元素添加动画
      this.pseudoHandler(node);

      const tagName = node.tagName && node.tagName.toUpperCase();
      switch (tagName) {
        case "SCRIPT":
          // 如果是script标签的话，则删除元素
          this.scriptHandler(node);
          break;
        case "IMG":
          // img元素处理
          // 1. 如果是base64或则静态图 不处理直接返回
          // 2. 这是渲染出来的固定宽高，设置src为空的base64
          // 3. 设置图片默认的背景色和backgroundImage背景图片
          this.imgHandler(node as HTMLImageElement);
          break;
        case "SVG":
          // svg处理
          // 1. 如果aria-hidden属性为true，或则宽高为0，则删除元素
          // 2. 清除元素centent
          // 3. 设置元素渲染后的宽高
          this.svgHandler(node as HTMLImageElement);
          break;
        // 处理input 元素
        // 删除placeholder 和 value
        case "INPUT":
          this.inputHandler(node as HTMLInputElement);
          break;
        // 处理button
        // 1. 设置boxshadow为none
        // 2. 设置元素渲染出的宽高，清空子元素
        case "BUTTON": // Button processing ends once
          this.buttonHandler(node as HTMLButtonElement);
          break;
          // 处理A标签
          // 1. 删除href属性
        case "A": // A label processing is placed behind to prevent IMG from displaying an exception
          this.aHandler(node);
          break;
      }
      // 处理子节点为纯文本节点元素 <p>xxx</p>
      if (
        node.childNodes &&
        node.childNodes.length === 1 &&
        node.childNodes[0].nodeType === Node.TEXT_NODE
      ) {
        this.textHandler(node);
        return;
      }
      if (node.hasChildNodes()) {
        node.childNodes.forEach((node) => this.handleNode(node));
      }
    }
  }
  // 处理文本
  // 1. 获取行高
  // 2. 根据元素高度计算渲染几行
  // 3. 利用background-repeat 和background-size y等于一行的高度 渲染出多行的骨架屏
  // 4. 如果是多行，则处理最后一行的对齐方式，新增一个元素，利用定位覆盖
  textHandler(ele: HTMLElement) {
    // Handling text styles
    const comStyle = window.getComputedStyle(ele);
    let {
      display,
      lineHeight,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      position: pos,
      fontSize,
      textAlign,
      wordSpacing,
      wordBreak,
    } = comStyle;
    if (!/\d/.test(lineHeight)) {
      const fontSizeNum = parseInt(fontSize, 10) || 14;
      lineHeight = `${fontSizeNum * 1.4}px`;
    }
    const position = ["fixed", "absolute", "flex"].find((p) => p === pos)
      ? pos
      : "relative";

    const height = ele.offsetHeight;
    const width = ele.offsetWidth;
    // Round down
    let lineCount =
      (height - parseFloat(paddingTop) - parseFloat(paddingBottom)) /
        parseFloat(lineHeight) || 0;

    lineCount = lineCount < 1.5 ? 1 : lineCount;

    const textHeightRatio = 0.6; // Default

    // Add text block class name tag
    ele.classList.add(SKELETON_TEXT_CLASS);

    Object.assign(ele.style, {
      backgroundImage: `linear-gradient(
            transparent ${((1 - textHeightRatio) / 2) * 100}%,
            ${MAIN_COLOR} 0%,
            ${MAIN_COLOR} ${
        ((1 - textHeightRatio) / 2 + textHeightRatio) * 100
      }%,
            transparent 0%
          )`,
      backgroundSize: `100% ${px2rem(parseInt(lineHeight) * 1.1)}`,
      position,
    });
    // add white mask
    if(display==='inline'){
      return
    }
    if (lineCount > 1) {
      this.addTextMask(
        ele,
        Object.assign(JSON.parse(JSON.stringify(comStyle)), {
          lineHeight,
        })
      );
    } else {
      const textWidth = this.getTextWidth(ele, {
        fontSize,
        lineHeight,
        wordBreak,
        wordSpacing,
      });
      const textWidthPercent =
        textWidth /
        (width -
          parseInt(paddingRight, 10) -
          parseInt(paddingLeft, 10));
      ele.style.backgroundSize = `${textWidthPercent * 100}% ${px2rem(parseInt(lineHeight) * 1.1)}`;
      switch (textAlign) {
        case "left":
          break;
        case "right":
          ele.style.backgroundPositionX = "100%";
          break;
        case "center":
          ele.style.backgroundPositionX = "50%";
      }
    }
  }
  addTextMask(
    paragraph: HTMLElement,
    {
      textAlign,
      lineHeight,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }: {
      textAlign: string;
      lineHeight: string;
      paddingBottom: string;
      paddingLeft: string;
      paddingRight: string;
    },
    maskWidthPercent = 0.5
  ) {
    let left;
    let right;
    switch (textAlign) {
      case "center":
        left = document.createElement("span");
        right = document.createElement("span");
        [left, right].forEach((mask) => {
          Object.assign(mask.style, {
            display: "inline-block",
            width: `${(maskWidthPercent / 2) * 100}%`,
            height: lineHeight,
            background: "#fff",
            position: "absolute",
            bottom: paddingBottom,
          });
        });
        left.style.left = paddingLeft;
        right.style.right = paddingRight;
        paragraph.appendChild(left);
        paragraph.appendChild(right);
        break;
      case "right":
        left = document.createElement("span");
        Object.assign(left.style, {
          display: "inline-block",
          width: `${maskWidthPercent * 100}%`,
          height: lineHeight,
          background: "#fff",
          position: "absolute",
          bottom: paddingBottom,
          left: paddingLeft,
        });
        paragraph.appendChild(left);
        break;
      case "left":
      default:
        right = document.createElement("span");
        Object.assign(right.style, {
          display: "inline-block",
          width: `${maskWidthPercent * 100}%`,
          height: lineHeight,
          background: "#fff",
          position: "absolute",
          bottom: paddingBottom,
          right: paddingRight,
        });
        paragraph.appendChild(right);
        break;
    }
  }

  getTextWidth(
    ele: HTMLElement,
    style: {
      fontSize: string;
      lineHeight: string;
      wordBreak: string;
      wordSpacing: string;
    }
  ) {
    const MOCK_TEXT_ID = "skeleton-text-id";
    let offScreenParagraph = document.querySelector(`#${MOCK_TEXT_ID}`);
    if (!offScreenParagraph) {
      const wrapper = document.createElement("p");
      wrapper.id = MOCK_WRAPPER_ID;
      offScreenParagraph = document.createElement("span");
      Object.assign(wrapper.style, {
        width: "10000px",
        position: "absolute",
        top: "0",
      });
      offScreenParagraph.id = MOCK_TEXT_ID;
      (offScreenParagraph as HTMLElement).style.visibility = "hidden";
      wrapper.appendChild(offScreenParagraph);
      document.body.appendChild(wrapper);
    }
    Object.assign((offScreenParagraph as HTMLElement).style, style);
    // ele.childNodes && setStylesInNode(ele.childNodes);
    offScreenParagraph.innerHTML = ele.innerHTML;
    return offScreenParagraph.getBoundingClientRect().width;
  }

  scriptHandler(node: HTMLElement) {
    removeElement(node);
  }
  imgHandler(node: HTMLImageElement) {
    if (node.src) {
      // 如果是base64，不处理
      if (/^data:image/.test(node.src)) {
        return false;
      }
      // 如果是oss静态图也不处理
      else if (
        node.src.indexOf(
          "https://zeekrlife-oss.oss-cn-hangzhou.aliyuncs.com/frontend"
        ) !== -1 ||
        node.src.indexOf("https://zeekrlife-oss.zeekrlife.com/frontend") !== -1
      ) {
        return false;
      }
    }
    const { width, height } = node.getBoundingClientRect();
    node.style.width = width + "px";
    node.style.height = height + "px";
    node.src = SMALLEST_BASE64;
    node.style.backgroundColor = IMG_BG;
    if (width >= 300 || height >= 300) {
      node.classList.add(IMG_CLASS_LARGE);
    } else if (width >= 150 || height >= 150) {
      node.classList.add(IMG_CLASS_MID);
    } else if (width >= 75 || height >= 75) {
      node.classList.add(IMG_CLASS_SMALL);
    }
    this.addAnimationForElement(node);
  }
  aHandler(node: HTMLElement) {
    node.removeAttribute("href");
  }
  svgHandler(node: HTMLImageElement) {
    const { width, height } = node.getBoundingClientRect();
    // Remove elements if they are not visible
    if (
      width === 0 ||
      height === 0 ||
      node.getAttribute("aria-hidden") === "true"
    ) {
      return removeElement(node);
    }

    // Clear node centent
    node.innerHTML = "";

    // Set style
    Object.assign(node.style, {
      width: px2rem(parseInt(width + "")),
      height: px2rem(parseInt(height + "")),
    });
    this.addAnimationForElement(node);
  }
  inputHandler(node: HTMLInputElement) {
    node.removeAttribute("placeholder");
    node.value = "";
  }
  buttonHandler(node: HTMLButtonElement) {
    if (!node.tagName) return;

    node.classList.add(BUTTON_CLASS);

    let { width, height } = window.getComputedStyle(node);

    node.style.width = width;
    node.style.height = height;

    // Clear button content
    node.innerHTML = "";
    this.addAnimationForElement(node);
  }
  /**
   * Processing text nodes
   * @param {*} node Node
   * @return {Boolean} True means that processing has been completed, false means that processing still needs to be continued
   */

  pseudoHandler(node: HTMLElement) {
    if (!node.tagName) return;

    const pseudo = checkHasPseudoEle(node);

    if (!pseudo || !pseudo.ele) return;

    const { ele, width } = pseudo;

    // Width is less than the hiding threshold
    if (width < this.options.minGrayPseudoWidth || 30) {
      return ele.classList.add(TRANSPARENT_CLASS);
    }

    ele.classList.add(PSEUDO_CLASS);
    if (this.options.animation) {
      ele.classList.add(PSEUDO_CLASS_ANIMATION);
    }
  }
  beforeHandler(node: HTMLElement) {
    if (!node.tagName) return;
    // Handling empty elements of user tags
    if (hasAttr(node, "data-skeleton-empty")) {
      emptyHandler(node);
    }

    // Width is less than the hiding threshold
    const { width } = node.getBoundingClientRect();
    const isHidden = width < this.options.minGrayBlockWidth;
    if (isHidden) {
      setOpacity(node);
    }

    const ComputedStyle = window.getComputedStyle(node);

    // The background image is changed to the main color
    if (ComputedStyle.backgroundImage !== "none") {
      node.style.backgroundImage = "none";
      node.style.background = MAIN_COLOR;
      // 增加动画效果
      !isHidden && this.addAnimationForElement(node);
    }

    // The Shadow is changed to the main color
    if (ComputedStyle.boxShadow !== "none") {
      const oldBoxShadow = ComputedStyle.boxShadow;
      const newBoxShadow = oldBoxShadow.replace(/^rgb.*\)/, MAIN_COLOR_RGB);
      node.style.boxShadow = newBoxShadow;
    }

    // The border is changed to the main color
    if (ComputedStyle.borderColor) {
      node.style.borderColor = MAIN_COLOR;
    }

    // Set the background color of the user class
    const bgColor = node.getAttribute("data-skeleton-bgcolor");
    if (bgColor) {
      node.style.backgroundColor = bgColor;
      node.style.color = "transparent";
      // 增加动画效果
      !isHidden && this.addAnimationForElement(node);
    }
  }
  addAnimationForElement(ele: HTMLElement) {
    if (ele) {
      ele.style.animation = this.options.animation
        ? "skeleton-opacity-animation 1.5s ease infinite"
        : "";
    }
  }
}
window.SkeletonRender = SkeletonRender;
