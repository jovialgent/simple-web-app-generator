import { Observable } from 'rxjs';
import { ISwagBasicActionConfig } from './swag-basic-action-config.interface';
import { ISwagBasicVisit, SwagBasicVisitManager } from '../../config';
import { SwagBasicClientManager } from '../../client';

export interface ISwagAction {
  run$: (
    action: ISwagBasicActionConfig,
    app: SwagBasicClientManager
  ) => Observable<ISwagBasicVisit>;
  run: (
    action: ISwagBasicActionConfig,
    app: SwagBasicClientManager
  ) => Promise<ISwagBasicVisit>;
}
