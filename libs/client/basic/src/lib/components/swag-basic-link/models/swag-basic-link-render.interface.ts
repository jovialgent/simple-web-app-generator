import {
  ISwagBasicPageNavigationRule,
  ISwagBasicTemplateRender
} from '../../models';

export interface ISwagBasicLinkRender extends ISwagBasicTemplateRender {
  tag: string;
  body: string;
  route?: string | ISwagBasicPageNavigationRule[];
}
