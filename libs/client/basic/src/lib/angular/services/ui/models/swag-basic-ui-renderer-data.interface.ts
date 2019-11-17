import { ISwagBasicPage, ISwagBasicTemplate } from '../../../../components';

import { ISwagBasicVisit } from '../../../../services';
import { Observable } from 'rxjs';

export interface ISwagBasicUiRendererData {
  settings: ISwagBasicTemplate;
  visit: ISwagBasicVisit;
  pageInfo: ISwagBasicPage;
  style$: Observable<any>;
}
