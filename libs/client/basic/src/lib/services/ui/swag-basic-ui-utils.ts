import { isString } from 'util';

export class SwagBasicUiUtils {
  static findElements(element: HTMLElement | NodeList | string): HTMLElement[] {
    const isElementString = isString(element);
    const isElement = element instanceof HTMLElement;
    const isNodeList = element instanceof NodeList;
    const results = isElementString
      ? document.querySelectorAll(element.toString())
      : isElement
      ? [<Node>element]
      : isNodeList
      ? <NodeList>element
      : [];

    return Array.from(results).map(element => {
      return <HTMLElement>element;
    });
  }
}
