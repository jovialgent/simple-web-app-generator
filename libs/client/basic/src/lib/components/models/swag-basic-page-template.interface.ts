import { ISwagBasicRuleObject } from '../../services';
import { ISwagBasicPageStyleRuleObject } from './swag-basic-page-style-rule-object.interface';

export interface ISwagBasicPageTemplate {
  html: string;
  style?: string | CSSStyleDeclaration | ISwagBasicPageStyleRuleObject[];
  classes?: string | object | ISwagBasicRuleObject[];
}
