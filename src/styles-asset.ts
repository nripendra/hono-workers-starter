import cssText from "./styles.css?inline";

function hashText(value: string): string {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

export const stylesheetText = cssText;
export const stylesheetPath = `/assets/styles.${hashText(cssText)}.css`;
