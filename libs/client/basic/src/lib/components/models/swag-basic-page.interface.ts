import {
  ISwagAction,
  ISwagBasicActionConfig
} from '../../services/actions/models';
import { ISwagBasicRule, ISwagBasicRuleObject } from '../../services';

import { ISwagBasicPageHeader } from '../swag-basic-page-header';
import { ISwagBasicPageNavigationRule } from './swag-basic-page-navigation-rule.interface';
import { ISwagBasicPageStyleRuleObject } from './swag-basic-page-style-rule-object.interface';
import { ISwagBasicPageTemplate } from './swag-basic-page-template.interface';

export interface ISwagBasicPage {
  id: string;
  path: string;
  style?: string | CSSStyleDeclaration | ISwagBasicPageStyleRuleObject[];
  classes?: string | object | ISwagBasicRuleObject[];
  header?: ISwagBasicPageHeader;
  footer?: ISwagBasicPageTemplate;
  onLoad?: ISwagBasicActionConfig[];
  onLeave?: ISwagBasicActionConfig[];
  next?: ISwagBasicPageNavigationRule[];
}
