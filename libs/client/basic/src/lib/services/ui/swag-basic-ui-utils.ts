import { isString, isObject } from 'lodash';
import { ISwagBasicAttributes } from '../../components';

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

  static createAttributeString(attributes: ISwagBasicAttributes): string {
    const attributeTags = Object.keys(attributes);

    return attributeTags.reduce(
      (currentTag, attributeTag) =>
        `${currentTag} ${this._createAttribute(
          attributeTag,
          attributes[attributeTag]
        )}`,
      ``
    );
  }

  static createObjectString(value: any): string {
    const jsonString = JSON.stringify(value);
    const regex = /"([a-z,A-Z,0-9,\-]+)":/gm;
    const subst = `$1:`;
    const result = jsonString.replace(regex, subst);

    return result;
  }

  static createTimestamp(timeInSeconds: number): string {
    const calculatedMinutes = Math.floor(timeInSeconds / 60);
    const calculatedHours = calculatedMinutes / 60;
    const calculatedSeconds = Math.floor(timeInSeconds % 60);
    const hours =
      calculatedHours >= 10 ? `${calculatedHours}` : `0${calculatedHours}`;
    const minutes =
      calculatedMinutes >= 10
        ? `${calculatedMinutes}`
        : `0${calculatedMinutes}`;
    const seconds =
      calculatedSeconds >= 10
        ? `${calculatedSeconds}`
        : `0${calculatedSeconds}`;

    return `${calculatedHours > 0 ? hours + ':' : ''}${minutes}:${seconds}`;
  }

  private static _createAttribute(attributeTag: string, value: any): string {
    const parsedValue: string = this._parseAttributeValue(value);

    return `${attributeTag}="${parsedValue}"`;
  }

  private static _parseAttributeValue(value: any): string {
    const quoteRegex = /\"/gm;
    const singleQuote = `'`;
    return isObject(value)
      ? this.createObjectString(value).replace(quoteRegex, singleQuote)
      : value.toString();
  }
}
