import { ISwagBasicTemplateRender } from '../../models';

export interface ISwagBasicPageFooterRender extends ISwagBasicTemplateRender {
  tag?: string;
  body?: string;
  template?: string;
}
