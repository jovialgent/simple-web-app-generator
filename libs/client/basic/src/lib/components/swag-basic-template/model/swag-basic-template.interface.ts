import {
  ISwagBasicPageClassesRuleObject,
  ISwagBasicPageStyleRuleObject
} from '../../../services';

import { ISwagBasicAttributes } from '../../models';

export interface ISwagBasicTemplate {
  id: string;
  html?: string;
  style?: string | CSSStyleDeclaration | ISwagBasicPageStyleRuleObject[];
  classes?: string | string[] | ISwagBasicPageClassesRuleObject[];
  data?: any;
  attributes?: ISwagBasicAttributes;
}
