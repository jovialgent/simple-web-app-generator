import { Observable } from 'rxjs';
import { ISwagBasicActionConfig } from './swag-basic-action-config.interface';
import { ISwagBasicVisit, SwagBasicVisitManager } from '../../config';

export interface ISwagAction {
   run$: (action : ISwagBasicActionConfig, visit : SwagBasicVisitManager) => Observable<ISwagBasicVisit>;
   run: (action : ISwagBasicActionConfig, visit : SwagBasicVisitManager) => Promise<ISwagBasicVisit>;
}
