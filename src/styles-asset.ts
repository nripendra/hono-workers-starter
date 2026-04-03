import cssText from "./styles.css?inline";
import { hashText } from "./hash";

export const stylesheetText = cssText;
export const stylesheetPath = `/assets/styles.${hashText(cssText)}.css`;
