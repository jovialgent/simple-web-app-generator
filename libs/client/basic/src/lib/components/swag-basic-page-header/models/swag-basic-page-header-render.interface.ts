import { ISwagBasicTemplateRender } from '../../models';

export interface ISwagBasicPageHeaderRender extends ISwagBasicTemplateRender {
  tag?: string;
  body?: string;
}
