import { ISwagBasicPage, SwagBasicUtilsMinimumOne } from '../../models';
import { ISwagBasicActionConfig } from '../../../services/actions/models';
import { ISwagBasicLink } from '../../swag-basic-link';

export interface ISwagBasicPageNavigation extends ISwagBasicPage {
  onLinksLoad?: ISwagBasicActionConfig[];
  links: SwagBasicUtilsMinimumOne<ISwagBasicLink>;
}
