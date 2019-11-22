import { ISwagBasicLinkAttributes } from './swag-basic-link-attributes.interface';
import { ISwagBasicLinkRender } from './swag-basic-link-render.interface';
import { ISwagBasicPageNavigationRule } from '../../models';
import { ISwagBasicTemplate } from '../../swag-basic-template';

export interface ISwagBasicLink extends ISwagBasicTemplate {
  id: string;
  url?: string;
  route?: ISwagBasicPageNavigationRule[];
  attributes?: ISwagBasicLinkAttributes;
  renderData?: ISwagBasicLinkRender;
}
