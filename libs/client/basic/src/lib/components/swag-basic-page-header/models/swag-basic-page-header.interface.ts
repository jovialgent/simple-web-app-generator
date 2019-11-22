import { ISwagBasicPageHeaderRender } from './swag-basic-page-header-render.interface';
import { ISwagBasicTemplate } from '../../swag-basic-template';

export interface ISwagBasicPageHeader extends ISwagBasicTemplate {
  renderData?: ISwagBasicPageHeaderRender;
}
