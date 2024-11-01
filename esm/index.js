import { getFallbackSelector } from "./selector-fallback.js";
import { sanitizeOptions } from "./utilities-options.js";
import { getClosestIdentifiableParent, sanitizeSelectorNeedle, } from "./utilities-selectors.js";
import { getRootNode, testSelector } from "./utilities-dom.js";
import { SELECTOR_SEPARATOR } from "./constants.js";
/**
 * Generates unique CSS selector for an element.
 */
export function getCssSelectorNoFallback(needle, custom_options = {}) {
    var _a;
    const elements = sanitizeSelectorNeedle(needle);
    const options = sanitizeOptions(elements[0], custom_options);
    const root = (_a = options.root) !== null && _a !== void 0 ? _a : getRootNode(elements[0]);
    let partialSelector = "";
    let currentRoot = root;
    /**
     * Utility function to make subsequent calls shorter.
     */
    function updateIdentifiableParent() {
        return getClosestIdentifiableParent(elements, currentRoot, partialSelector, options);
    }
    let closestIdentifiableParent = updateIdentifiableParent();
    while (closestIdentifiableParent) {
        const { foundElements, selector } = closestIdentifiableParent;
        if (testSelector(elements, selector, root)) {
            return selector;
        }
        currentRoot = foundElements[0];
        partialSelector = selector;
        closestIdentifiableParent = updateIdentifiableParent();
    }
    // if failed to find single selector matching all elements, try to find
    // selector for each standalone element and join them together
    if (elements.length > 1) {
        return elements
            .map((element) => getCssSelector(element, options))
            .join(SELECTOR_SEPARATOR);
    }
}
export function getCssSelector(needle, custom_options = {}) {
    const selector = getCssSelectorNoFallback(needle, custom_options);
    return selector !== null && selector !== void 0 ? selector : getFallbackSelector(sanitizeSelectorNeedle(needle));
}
export default getCssSelector;
//# sourceMappingURL=index.js.map