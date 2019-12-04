import { ISwagBasicPage, SwagBasicUtilsMinimumOne } from '../../models';

import { ISwagBasicActionConfig } from '../../../services/actions/models';
import { ISwagBasicLink } from '../../swag-basic-link';
import { SwagPageBasicNavigationSettings } from './swag-basic-page-navigation.enum';

export interface ISwagBasicPageNavigation extends ISwagBasicPage {
  type: SwagPageBasicNavigationSettings.Type;
  onLinksLoad?: ISwagBasicActionConfig[];
  links: SwagBasicUtilsMinimumOne<ISwagBasicLink>;
}
