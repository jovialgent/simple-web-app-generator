import {
  ISwagAction,
  ISwagBasicActionConfig
} from '../../services/actions/models';
import {
  ISwagBasicPageClassesRuleObject,
  ISwagBasicPageStyleRuleObject,
  ISwagBasicRule,
  ISwagBasicRuleObject
} from '../../services';

import { ISwagBasicPageHeader } from '../swag-basic-page-header';
import { ISwagBasicPageNavigationRule } from './swag-basic-page-navigation-rule.interface';
import { ISwagBasicPageTemplate } from './swag-basic-page-template.interface';

export interface ISwagBasicPage {
  id: string;
  path: string;
  style?: string | CSSStyleDeclaration | ISwagBasicPageStyleRuleObject[];
  classes?: string | object | ISwagBasicPageClassesRuleObject[];
  header?: ISwagBasicPageHeader;
  footer?: ISwagBasicPageTemplate;
  onLoad?: ISwagBasicActionConfig[];
  onLeave?: ISwagBasicActionConfig[];
  next?: ISwagBasicPageNavigationRule[];
}
