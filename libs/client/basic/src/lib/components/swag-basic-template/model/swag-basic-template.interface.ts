import {
  ISwagBasicPageClassesRuleObject,
  ISwagBasicPageStyleRuleObject
} from '../../models';

export interface ISwagBasicTemplate {
  id: string;
  html: string;
  style?: string | CSSStyleDeclaration | ISwagBasicPageStyleRuleObject[];
  classes?: string | object | ISwagBasicPageClassesRuleObject[];
}
