import {
  ISwagBasicPageClassesRuleObject,
  ISwagBasicPageStyleRuleObject
} from '../../../services';

export interface ISwagBasicTemplate {
  id: string;
  html: string;
  style?: string | CSSStyleDeclaration | ISwagBasicPageStyleRuleObject[];
  classes?: string | string[] | ISwagBasicPageClassesRuleObject[];
}
