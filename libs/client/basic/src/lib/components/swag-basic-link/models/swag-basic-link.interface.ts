import { ISwagBasicLinkAttributes } from './swag-basic-link-attributes.interface';
import { ISwagBasicPageNavigationRule } from '../../models';

export interface ISwagBasicLink {
  id: string;
  url?: string;
  route?: ISwagBasicPageNavigationRule[];
  label?: string;
  attributes?: ISwagBasicLinkAttributes;
}
