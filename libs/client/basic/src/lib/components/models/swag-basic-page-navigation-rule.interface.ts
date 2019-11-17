import { ISwagBasicRuleObject } from '../../services';

export interface ISwagBasicPageNavigationRule extends ISwagBasicRuleObject {
  route?: string;
  url?: string;
}
