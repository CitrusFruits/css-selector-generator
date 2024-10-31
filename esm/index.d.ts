import { CssSelector, CssSelectorGeneratorOptionsInput } from "./types.js";
/**
 * Generates unique CSS selector for an element.
 */
export declare function getCssSelectorNoFallback(needle: Element | Element[], custom_options?: CssSelectorGeneratorOptionsInput): CssSelector | undefined;
export declare function getCssSelector(needle: Element | Element[], custom_options?: CssSelectorGeneratorOptionsInput): CssSelector;
export default getCssSelector;
