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

import { ISwagBasicPageFooter } from '../swag-basic-page-footer';
import { ISwagBasicPageHeader } from '../swag-basic-page-header';
import { ISwagBasicPageNavigationRule } from './swag-basic-page-navigation-rule.interface';

export interface ISwagBasicPage {
  id: string;
  path: string;
  style?: string | CSSStyleDeclaration | ISwagBasicPageStyleRuleObject[];
  classes?: string | object | ISwagBasicPageClassesRuleObject[];
  header?: ISwagBasicPageHeader;
  footer?: ISwagBasicPageFooter;
  onLoad?: ISwagBasicActionConfig[];
  onLeave?: ISwagBasicActionConfig[];
  next?: ISwagBasicPageNavigationRule[];
}
