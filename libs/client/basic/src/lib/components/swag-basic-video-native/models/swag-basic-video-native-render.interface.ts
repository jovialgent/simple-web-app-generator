import { ISwagBasicTemplateRender } from '../../models';

export interface ISwagBasicVideoNativeRender extends ISwagBasicTemplateRender {
  tag: string;
  body: string;
}
