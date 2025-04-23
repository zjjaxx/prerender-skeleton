// src/utils/skeletonUtil.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var cloneElementWithUniqueIds = function(element) {
    var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "__clone";
    var clonedElement = element.cloneNode(true);
    function updateIds(el, parentPrefix) {
        if (el.id) {
            el.id = "".concat(parentPrefix, "-").concat(el.id);
        }
        Array.from(el.children).forEach(function(child, index) {
            updateIds(child, "".concat(parentPrefix, "-").concat(index));
        });
    }
    updateIds(clonedElement, prefix);
    return clonedElement;
};
var removeElement = function(ele) {
    var parent = ele.parentNode;
    if (parent) {
        parent.removeChild(ele);
    }
};
var inViewPort = function(ele) {
    try {
        var rect = ele.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.left < window.innerWidth;
    } catch (e) {
        return true;
    }
};
var hasAttr = function(ele, attr) {
    try {
        return ele.hasAttribute(attr);
    } catch (e) {
        return false;
    }
};
var setOpacity = function(ele) {
    if (ele.style) {
        ele.style.opacity = 0;
    }
};
var px2rem = function(px) {
    var pxValue = typeof px === "string" ? parseInt(px, 10) : px;
    var htmlElementFontSize = window.getComputedStyle(document.documentElement).fontSize;
    return "".concat(pxValue / parseInt(htmlElementFontSize, 10), "rem");
};
var emptyHandler = function(node) {
    node.innerHTML = "";
    var classNameArr = node.className && node.className.split(" ") || [];
    classNameArr = classNameArr.map(function(item) {
        return "." + item;
    });
    var className = classNameArr.join("");
    var id = node.id ? "#" + node.id : "";
    var query = className || id;
    if (!query) return;
    var styleSheet;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = document.styleSheets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var item = _step.value;
            if (!item.href) {
                styleSheet = item;
                break;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    try {
        styleSheet && styleSheet.insertRule("".concat(query, "::before{content:'' !important;background:none !important;}"), 0);
        styleSheet && styleSheet.insertRule("".concat(query, "::after{content:'' !important;background:none !important;}"), 0);
    } catch (e) {
        console.log("handleEmptyNode Error: ", JSON.stringify(e));
    }
};
var checkHasPseudoEle = function(ele) {
    if (!ele) return false;
    var beforeComputedStyle = window.getComputedStyle(ele, "::before");
    var beforeContent = beforeComputedStyle.getPropertyValue("content");
    var beforeWidth = parseFloat(beforeComputedStyle.getPropertyValue("width")) || 0;
    var hasBefore = beforeContent && beforeContent !== "none";
    var afterComputedStyle = window.getComputedStyle(ele, "::after");
    var afterContent = afterComputedStyle.getPropertyValue("content");
    var afterWidth = parseFloat(afterComputedStyle.getPropertyValue("width")) || 0;
    var hasAfter = afterContent && afterContent !== "none";
    var width = Math.max(beforeWidth, afterWidth);
    if (hasBefore || hasAfter) {
        return {
            hasBefore: hasBefore,
            hasAfter: hasAfter,
            ele: ele,
            width: width
        };
    }
    return false;
};
var isTextNode = function(node) {
    return node.nodeType === Node.TEXT_NODE && node.nodeValue !== "";
};
var isHtmlElement = function(node) {
    return node.nodeType === Node.ELEMENT_NODE;
};
// src/skeleton.ts
var SKELETON_CLONE_CLASS = "skeleton_clone";
var MOCK_WRAPPER_ID = "skeleton-text-wrapper-id";
var MAIN_COLOR = "#EEEEEE";
var MAIN_COLOR_RGB = "rgb(238, 238, 238)";
var PSEUDO_CLASS = "sk-pseudo";
var PSEUDO_CLASS_ANIMATION = "sk-pseudo-animation";
var BUTTON_CLASS = "sk-button";
var TRANSPARENT_CLASS = "sk-transparent";
var SMALLEST_BASE64 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var IMG_BASE64_LARGE = "data:image/image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAopJREFUeF7tm1FyAyEIhs3JWk/W5mSmJ2tDRjtmBwUU3HXXPGUmG8P/gYJobu7ir9vF9TsWgBDCp3PuK8KC90d/3cFA7/03ZSgJIIQQnHMziMa03ikIVQBP7UAweZ6CedTPH/5JoWRcEcBJxCfdwOCBQZAAgAEgpNCBjuL+bL3Kp20xCmoAfjeiihSPIj7ZESHA2pVe/QC89+SCeSQQIYQ3B5bsZ0fAAiCIAKRuYOdlrSjaLQKIuoHMy1MDYKbOal6eFgBTPJmXzwTgVTdEQVBNsvLyzACKdYMkL2sAwKLRPA0ii99/4YQAgJ2aSV1Rmop7AKhNAZNsUFuHRgCAOZ6Xn7VoVgdALcLmAEAts3cwXHxsjqBTTr0UJjyhXgNQns/y7hgAMRJSKwrSX9o+q2+lK+Ih/b41coZMAY0Uxh2jJh7aYLvtBbgCep6jxMcoPOd2mCP+tAC44k8JQCJ+OIBSI/J5NvFD9eU5a4FU/FAAWJ2PiGouflrEDwPALUIyICIQreKHAGgQnwcGCaJHvDkAjnFMQCgIzvjU2mFWCEmNk4KQjl8CYQKgxzgmiJIecspsv6gOIPb3sJNikXENIETjJxAWADDvNBmX7Ripo/fm88gRAJrF5yRjRHxsu8a9J9HWAFTEUyt5z+eWAA4v3qQOiN6YQrwVgGnEmwCwOsjomee176qvAQuA0VHWigAjAmsKrEtS65ZY97nA9pJ088bEaJoXh9W6ILEFMPNV2WIRVzsdlpz3j3ay9PfkAGI5OfN/BRKkaglP3tNp6OBIvWP5PHkfgQSQdW/gLdXBsRTDHVt0H4EFgPvLMz63AMzoNU2bVwRo0pxxrBUBM3pN0+YVAZo0Zxzr8hHwB9VpX1/uYOP2AAAAAElFTkSuQmCC";
var IMG_BASE64_MID = "data:image/image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAT1JREFUWEftlm0OwyAIhu3JNk+29WRsJ9tKowapH4AxXbI26T+Fx5dXcHEnfwvPDwBP59zNOXefwLZ67zF++jKAkPwxITENmUFwgE9YeSAdhSKHe/lNhhivCOC9P5RmFAD3A8B+QBpfDMC8YVLIDFDxhhpiBCB5I5QCjZrVUlKiEQAI13IlAFktewCwyRivttoDoyWgyUdNuEu/GfnNG0pNAZIc9+3NTa1AT15Jcrz7Zg9YAOjJY+MxAwAASoc/Oh+lbH6l5OZGxA3Ua9W15CYAZiCMwSdk1oxaydUADRlxnPKJGcsSy5SGDa2V2APhqvWCFUHopONG0QDgXlGr1RhUAyBK3rsNZgV+8j2gPW1pvbgEf61AmvvSaSctDR3prWlYutvSHNJ19Wd5aJezIIrviCnPb6kUuO4CuBT4AqsEKzBFERGIAAAAAElFTkSuQmCC";
var IMG_BASE64_SMALL = "data:image/image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAMdJREFUOE+lU4ENwjAM8z7hE8gl8AnwCVyS8QmngKOkCt0yFai0Ve0Sx7GzCb5U9QCAz9ASkQsDJ75UlYc9gMdQNnB+x4qIzBmAN4YabOLcg3pBi18AJDZsx6qsANwAPCsAJpIi92vPwtlpfKtaYCtzXz0l30sGocFGsoRbixZYlRr6bo4wKFU2TSoRdwCOIVwEub0fglYAzdusOquvtGN25xZoCy9OI4O0OQe/AoT334yyzYjNQfofRggwps1IAxjN7OP+BngBsiWUEe5m32cAAAAASUVORK5CYII=";
var IMG_BG = "#dddddd";
var SKELETON_TEXT_CLASS = "skeleton-text-block-mark";
var IMG_CLASS_SMALL = "sk-img-small";
var IMG_CLASS_MID = "sk-img-mid";
var IMG_CLASS_LARGE = "sk-img-large";
var skeletonStyle = "\n\n      .".concat(SKELETON_CLONE_CLASS, "{\n        position:fixed;\n        left:0;\n        right:0;\n        top:0;\n        bottom:0;\n        z-index:1000000;\n        width:100vw;\n        height:100vh;\n      }\n\n      .").concat(SKELETON_TEXT_CLASS, ",\n      .").concat(SKELETON_TEXT_CLASS, " * {\n        background-origin: content-box;\n        background-clip: content-box;\n        background-color: transparent;\n        color: transparent !important;\n        background-repeat: repeat-y;\n      }\n  \n      .").concat(PSEUDO_CLASS, "::before,\n      .").concat(PSEUDO_CLASS, "::after {\n        background: ").concat(MAIN_COLOR, " !important;\n        background-image: none !important;\n        color: transparent !important;\n        border-color: transparent !important;\n      }\n      .").concat(PSEUDO_CLASS_ANIMATION, "::before,\n      .").concat(PSEUDO_CLASS_ANIMATION, "::after {\n          animation: skeleton-opacity-animation 1.5s ease infinite !important;\n      }\n  \n      .").concat(BUTTON_CLASS, " {\n        box-shadow: none !important;\n      }\n\n      .").concat(IMG_CLASS_SMALL, "{\n         background-image: url(").concat(IMG_BASE64_SMALL, ") !important;\n         background-repeat:no-repeat !important;\n         background-position: center !important;\n      }\n      .").concat(IMG_CLASS_MID, "{\n         background-image: url(").concat(IMG_BASE64_MID, ") !important;\n         background-repeat:no-repeat !important;\n         background-position: center !important;\n      }\n      .").concat(IMG_CLASS_LARGE, "{\n         background-image: url(").concat(IMG_BASE64_LARGE, ") !important;\n         background-repeat:no-repeat !important;\n         background-position: center !important;\n      }\n  \n      .").concat(TRANSPARENT_CLASS, "::before,\n      .").concat(TRANSPARENT_CLASS, "::after {\n        opacity: 0 !important;\n      }\n      \n      @keyframes skeleton-opacity-animation {\n        0% {\n          opacity: 1;\n        }\n        30% {\n          opacity: 0.65;\n        }\n        100% {\n         opacity: 1;\n        }\n      }\n  \n    ");
var SkeletonRender = /*#__PURE__*/ function() {
    "use strict";
    function SkeletonRender(options) {
        _class_call_check(this, SkeletonRender);
        this.options = Object.assign({
            debug: false,
            animation: true,
            appId: "app",
            minGrayBlockWidth: 30,
            minGrayPseudoWidth: 30
        }, options);
    }
    _create_class(SkeletonRender, [
        {
            key: "removeMock",
            value: function removeMock() {
                var getTextWidthElement = document.querySelector("#".concat(MOCK_WRAPPER_ID));
                if (getTextWidthElement) getTextWidthElement.remove();
            }
        },
        {
            key: "genSkeleton",
            value: function genSkeleton() {
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.startGenSkeleton()
                                ];
                            case 1:
                                _state.sent();
                                _this.removeMock();
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "startGenSkeleton",
            value: function startGenSkeleton() {
                var _this = this;
                return _async_to_generator(function() {
                    var app, newNode;
                    return _ts_generator(this, function(_state) {
                        debugger;
                        app = document.getElementById(_this.options.appId);
                        if (!app) {
                            console.error("\u6839\u5143\u7D20\u6CA1\u627E\u5230~");
                            return [
                                2,
                                false
                            ];
                        }
                        newNode = cloneElementWithUniqueIds(app);
                        newNode.id = "__skeleton_clone";
                        newNode.classList.add(SKELETON_CLONE_CLASS);
                        app.style.visibility = "hidden";
                        document.body.prepend(newNode);
                        _this.styleHandler();
                        try {
                            _this.handleNode(newNode);
                        } catch (e) {
                            if (_instanceof(e, Error)) {
                                console.log("==genSkeleton Error==\n", e.message, e.stack);
                            }
                        }
                        return [
                            2
                        ];
                    });
                })();
            }
        },
        {
            // Initialization processing DOM
            key: "styleHandler",
            value: function styleHandler() {
                var skeletonBlockStyleEle = document.createElement("style");
                skeletonBlockStyleEle.innerText = skeletonStyle.replace(/\n/g, "");
                document.body.prepend(skeletonBlockStyleEle);
            }
        },
        {
            // Processing a single node
            key: "handleNode",
            value: function handleNode(node) {
                var _this = this;
                if (!node) return;
                if (isTextNode(node)) {
                    var parent = node.parentNode;
                    if (!parent.classList.contains(SKELETON_TEXT_CLASS)) {
                        var textContent = node.textContent.replace(/[\r\n]/g, "").trim();
                        if (textContent) {
                            var tmpNode = document.createElement("i");
                            tmpNode.classList.add(SKELETON_TEXT_CLASS);
                            tmpNode.innerHTML = textContent;
                            node.parentNode.replaceChild(tmpNode, node);
                            this.textHandler(tmpNode);
                            return true;
                        }
                    }
                } else if (isHtmlElement(node)) {
                    if (!inViewPort(node) || hasAttr(node, "data-skeleton-remove")) {
                        return removeElement(node);
                    }
                    var ignore = hasAttr(node, "data-skeleton-ignore") || node.tagName === "STYLE";
                    if (ignore) return;
                    this.beforeHandler(node);
                    this.pseudoHandler(node);
                    var tagName = node.tagName && node.tagName.toUpperCase();
                    switch(tagName){
                        case "SCRIPT":
                            this.scriptHandler(node);
                            break;
                        case "IMG":
                            this.imgHandler(node);
                            break;
                        case "SVG":
                            this.svgHandler(node);
                            break;
                        // 处理input 元素
                        // 删除placeholder 和 value
                        case "INPUT":
                            this.inputHandler(node);
                            break;
                        // 处理button
                        // 1. 设置boxshadow为none
                        // 2. 设置元素渲染出的宽高，清空子元素
                        case "BUTTON":
                            this.buttonHandler(node);
                            break;
                        // 处理A标签
                        // 1. 删除href属性
                        case "A":
                            this.aHandler(node);
                            break;
                    }
                    if (node.childNodes && node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
                        this.textHandler(node);
                        return;
                    }
                    if (node.hasChildNodes()) {
                        node.childNodes.forEach(function(node2) {
                            return _this.handleNode(node2);
                        });
                    }
                }
            }
        },
        {
            // 处理文本
            // 1. 获取行高
            // 2. 根据元素高度计算渲染几行
            // 3. 利用background-repeat 和background-size y等于一行的高度 渲染出多行的骨架屏
            // 4. 如果是多行，则处理最后一行的对齐方式，新增一个元素，利用定位覆盖
            key: "textHandler",
            value: function textHandler(ele) {
                var comStyle = window.getComputedStyle(ele);
                var display = comStyle.display, lineHeight = comStyle.lineHeight, paddingTop = comStyle.paddingTop, paddingRight = comStyle.paddingRight, paddingBottom = comStyle.paddingBottom, paddingLeft = comStyle.paddingLeft, pos = comStyle.position, fontSize = comStyle.fontSize, textAlign = comStyle.textAlign, wordSpacing = comStyle.wordSpacing, wordBreak = comStyle.wordBreak;
                if (!/\d/.test(lineHeight)) {
                    var fontSizeNum = parseInt(fontSize, 10) || 14;
                    lineHeight = "".concat(fontSizeNum * 1.4, "px");
                }
                var position = [
                    "fixed",
                    "absolute",
                    "flex"
                ].find(function(p) {
                    return p === pos;
                }) ? pos : "relative";
                var height = ele.offsetHeight;
                var width = ele.offsetWidth;
                var lineCount = (height - parseFloat(paddingTop) - parseFloat(paddingBottom)) / parseFloat(lineHeight) || 0;
                lineCount = lineCount < 1.5 ? 1 : lineCount;
                var textHeightRatio = 0.6;
                ele.classList.add(SKELETON_TEXT_CLASS);
                Object.assign(ele.style, {
                    backgroundImage: "linear-gradient(\n            transparent ".concat((1 - textHeightRatio) / 2 * 100, "%,\n            ").concat(MAIN_COLOR, " 0%,\n            ").concat(MAIN_COLOR, " ").concat(((1 - textHeightRatio) / 2 + textHeightRatio) * 100, "%,\n            transparent 0%\n          )"),
                    backgroundSize: "100% ".concat(px2rem(parseInt(lineHeight) * 1.1)),
                    position: position
                });
                debugger;
                if (display === "inline") {
                    return;
                }
                if (lineCount > 1) {
                    this.addTextMask(ele, Object.assign(JSON.parse(JSON.stringify(comStyle)), {
                        lineHeight: lineHeight
                    }));
                } else {
                    var textWidth = this.getTextWidth(ele, {
                        fontSize: fontSize,
                        lineHeight: lineHeight,
                        wordBreak: wordBreak,
                        wordSpacing: wordSpacing
                    });
                    var textWidthPercent = textWidth / (width - parseInt(paddingRight, 10) - parseInt(paddingLeft, 10));
                    ele.style.backgroundSize = "".concat(textWidthPercent * 100, "% ").concat(px2rem(parseInt(lineHeight) * 1.1));
                    switch(textAlign){
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
        },
        {
            key: "addTextMask",
            value: function addTextMask(paragraph, param) {
                var textAlign = param.textAlign, lineHeight = param.lineHeight, paddingBottom = param.paddingBottom, paddingLeft = param.paddingLeft, paddingRight = param.paddingRight, maskWidthPercent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.5;
                debugger;
                var left;
                var right;
                switch(textAlign){
                    case "center":
                        left = document.createElement("span");
                        right = document.createElement("span");
                        [
                            left,
                            right
                        ].forEach(function(mask) {
                            Object.assign(mask.style, {
                                display: "inline-block",
                                width: "".concat(maskWidthPercent / 2 * 100, "%"),
                                height: lineHeight,
                                background: "#fff",
                                position: "absolute",
                                bottom: paddingBottom
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
                            width: "".concat(maskWidthPercent * 100, "%"),
                            height: lineHeight,
                            background: "#fff",
                            position: "absolute",
                            bottom: paddingBottom,
                            left: paddingLeft
                        });
                        paragraph.appendChild(left);
                        break;
                    case "left":
                    default:
                        right = document.createElement("span");
                        Object.assign(right.style, {
                            display: "inline-block",
                            width: "".concat(maskWidthPercent * 100, "%"),
                            height: lineHeight,
                            background: "#fff",
                            position: "absolute",
                            bottom: paddingBottom,
                            right: paddingRight
                        });
                        paragraph.appendChild(right);
                        break;
                }
            }
        },
        {
            key: "getTextWidth",
            value: function getTextWidth(ele, style) {
                var MOCK_TEXT_ID = "skeleton-text-id";
                var offScreenParagraph = document.querySelector("#".concat(MOCK_TEXT_ID));
                if (!offScreenParagraph) {
                    var wrapper = document.createElement("p");
                    wrapper.id = MOCK_WRAPPER_ID;
                    offScreenParagraph = document.createElement("span");
                    Object.assign(wrapper.style, {
                        width: "10000px",
                        position: "absolute",
                        top: "0"
                    });
                    offScreenParagraph.id = MOCK_TEXT_ID;
                    offScreenParagraph.style.visibility = "hidden";
                    wrapper.appendChild(offScreenParagraph);
                    document.body.appendChild(wrapper);
                }
                Object.assign(offScreenParagraph.style, style);
                offScreenParagraph.innerHTML = ele.innerHTML;
                return offScreenParagraph.getBoundingClientRect().width;
            }
        },
        {
            key: "scriptHandler",
            value: function scriptHandler(node) {
                removeElement(node);
            }
        },
        {
            key: "imgHandler",
            value: function imgHandler(node) {
                if (node.src) {
                    if (/^data:image/.test(node.src)) {
                        return false;
                    } else if (node.src.indexOf("https://zeekrlife-oss.oss-cn-hangzhou.aliyuncs.com/frontend") !== -1 || node.src.indexOf("https://zeekrlife-oss.zeekrlife.com/frontend") !== -1) {
                        return false;
                    }
                }
                var _node_getBoundingClientRect = node.getBoundingClientRect(), width = _node_getBoundingClientRect.width, height = _node_getBoundingClientRect.height;
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
        },
        {
            key: "aHandler",
            value: function aHandler(node) {
                node.removeAttribute("href");
            }
        },
        {
            key: "svgHandler",
            value: function svgHandler(node) {
                var _node_getBoundingClientRect = node.getBoundingClientRect(), width = _node_getBoundingClientRect.width, height = _node_getBoundingClientRect.height;
                if (width === 0 || height === 0 || node.getAttribute("aria-hidden") === "true") {
                    return removeElement(node);
                }
                node.innerHTML = "";
                Object.assign(node.style, {
                    width: px2rem(parseInt(width + "")),
                    height: px2rem(parseInt(height + ""))
                });
                this.addAnimationForElement(node);
            }
        },
        {
            key: "inputHandler",
            value: function inputHandler(node) {
                node.removeAttribute("placeholder");
                node.value = "";
            }
        },
        {
            key: "buttonHandler",
            value: function buttonHandler(node) {
                if (!node.tagName) return;
                node.classList.add(BUTTON_CLASS);
                var _window_getComputedStyle = window.getComputedStyle(node), width = _window_getComputedStyle.width, height = _window_getComputedStyle.height;
                node.style.width = width;
                node.style.height = height;
                node.innerHTML = "";
                this.addAnimationForElement(node);
            }
        },
        {
            /**
   * Processing text nodes
   * @param {*} node Node
   * @return {Boolean} True means that processing has been completed, false means that processing still needs to be continued
   */ key: "pseudoHandler",
            value: function pseudoHandler(node) {
                if (!node.tagName) return;
                var pseudo = checkHasPseudoEle(node);
                if (!pseudo || !pseudo.ele) return;
                var ele = pseudo.ele, width = pseudo.width;
                if (width < this.options.minGrayPseudoWidth || 30) {
                    return ele.classList.add(TRANSPARENT_CLASS);
                }
                ele.classList.add(PSEUDO_CLASS);
                if (this.options.animation) {
                    ele.classList.add(PSEUDO_CLASS_ANIMATION);
                }
            }
        },
        {
            key: "beforeHandler",
            value: function beforeHandler(node) {
                if (!node.tagName) return;
                if (hasAttr(node, "data-skeleton-empty")) {
                    emptyHandler(node);
                }
                var width = node.getBoundingClientRect().width;
                var isHidden = width < this.options.minGrayBlockWidth;
                if (isHidden) {
                    setOpacity(node);
                }
                var ComputedStyle = window.getComputedStyle(node);
                if (ComputedStyle.backgroundImage !== "none") {
                    node.style.backgroundImage = "none";
                    node.style.background = MAIN_COLOR;
                    !isHidden && this.addAnimationForElement(node);
                }
                if (ComputedStyle.boxShadow !== "none") {
                    var oldBoxShadow = ComputedStyle.boxShadow;
                    var newBoxShadow = oldBoxShadow.replace(/^rgb.*\)/, MAIN_COLOR_RGB);
                    node.style.boxShadow = newBoxShadow;
                }
                if (ComputedStyle.borderColor) {
                    node.style.borderColor = MAIN_COLOR;
                }
                var bgColor = node.getAttribute("data-skeleton-bgcolor");
                if (bgColor) {
                    node.style.backgroundColor = bgColor;
                    node.style.color = "transparent";
                    !isHidden && this.addAnimationForElement(node);
                }
            }
        },
        {
            key: "addAnimationForElement",
            value: function addAnimationForElement(ele) {
                if (ele) {
                    ele.style.animation = this.options.animation ? "skeleton-opacity-animation 1.5s ease infinite" : "";
                }
            }
        }
    ]);
    return SkeletonRender;
}();
window.SkeletonRender = SkeletonRender;
export { SkeletonRender as default };
//# sourceMappingURL=skeleton.mjs.map