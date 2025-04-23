type SkeletonOption = PrerenderSkeletonOption["routes"][number];
declare class SkeletonRender {
    private options;
    constructor(options: SkeletonOption);
    removeMock(): void;
    genSkeleton(): Promise<void>;
    startGenSkeleton(): Promise<false | undefined>;
    styleHandler(): void;
    handleNode(node: HTMLElement | Node): true | void;
    textHandler(ele: HTMLElement): void;
    addTextMask(paragraph: HTMLElement, { textAlign, lineHeight, paddingBottom, paddingLeft, paddingRight, }: {
        textAlign: string;
        lineHeight: string;
        paddingBottom: string;
        paddingLeft: string;
        paddingRight: string;
    }, maskWidthPercent?: number): void;
    getTextWidth(ele: HTMLElement, style: {
        fontSize: string;
        lineHeight: string;
        wordBreak: string;
        wordSpacing: string;
    }): number;
    scriptHandler(node: HTMLElement): void;
    imgHandler(node: HTMLImageElement): false | undefined;
    aHandler(node: HTMLElement): void;
    svgHandler(node: HTMLImageElement): void;
    inputHandler(node: HTMLInputElement): void;
    buttonHandler(node: HTMLButtonElement): void;
    /**
     * Processing text nodes
     * @param {*} node Node
     * @return {Boolean} True means that processing has been completed, false means that processing still needs to be continued
     */
    pseudoHandler(node: HTMLElement): void;
    beforeHandler(node: HTMLElement): void;
    addAnimationForElement(ele: HTMLElement): void;
}

export { SkeletonRender as default };
