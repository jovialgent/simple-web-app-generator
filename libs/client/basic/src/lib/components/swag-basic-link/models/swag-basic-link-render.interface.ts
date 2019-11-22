import { ISwagBasicPageNavigationRule } from '../../models';

export interface ISwagBasicLinkRender {
  tag: string;
  body: string;
  route?: string | ISwagBasicPageNavigationRule[];
  template?: string;
}
