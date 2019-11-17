import { ISwagBasicPageStyleRuleObject } from '../../services/ui/models/swag-basic-page-style-rule-object.interface';
import { ISwagBasicRuleObject } from '../../services';

export interface ISwagBasicPageTemplate {
  html: string;
  style?: string | CSSStyleDeclaration | ISwagBasicPageStyleRuleObject[];
  classes?: string | object | ISwagBasicRuleObject[];
}
