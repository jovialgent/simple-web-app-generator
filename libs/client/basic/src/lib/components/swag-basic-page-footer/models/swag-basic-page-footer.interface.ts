import { ISwagBasicPageFooterRender } from './swag-basic-page-footer-render.interface';
import { ISwagBasicTemplate } from '../../swag-basic-template';

export interface ISwagBasicPageFooter extends ISwagBasicTemplate {
  renderData?: ISwagBasicPageFooterRender;
}
