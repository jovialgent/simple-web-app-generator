import { ISwagBasicActionConfig } from '../../../services';
import { ISwagBasicLinkAttributes } from './swag-basic-link-attributes.interface';
import { ISwagBasicLinkRender } from './swag-basic-link-render.interface';
import { ISwagBasicPageNavigationRule } from '../../models';
import { ISwagBasicTemplate } from '../../swag-basic-template';

export interface ISwagBasicLink extends ISwagBasicTemplate {
  id: string;
  url?: string;
  routes?: ISwagBasicPageNavigationRule[];
  route?: string;
  attributes?: ISwagBasicLinkAttributes;
  renderData?: ISwagBasicLinkRender;
  onLinkClick?: ISwagBasicActionConfig[];
}
