import { ISwagBasicAttributes } from './swag-basic-attributes.interface';
import { ISwagBasicPageStyleRuleObject } from '../../services/ui/models/swag-basic-page-style-rule-object.interface';
import { ISwagBasicRuleObject } from '../../services';

export interface ISwagBasicPageTemplate {
  html: string;
  style?: string | CSSStyleDeclaration | ISwagBasicPageStyleRuleObject[];
  classes?: string | object | ISwagBasicRuleObject[];
  data?: any;
  attributes?: ISwagBasicAttributes;
}
