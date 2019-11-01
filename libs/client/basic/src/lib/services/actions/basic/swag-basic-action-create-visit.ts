import { ISwagBasicAction, ISwagBasicActionConfigCreateVisit } from '../models';
import { Observable, of } from 'rxjs';
import { SwagBasicVisitManager } from '../../config';

export class SwagBasicActionCreateVisit implements ISwagBasicAction {
  run$(
    action: ISwagBasicActionConfigCreateVisit,
    visitManager: SwagBasicVisitManager
  ): Observable<any> {
    
    const config =
      !!action && !!action.args && !!action.args.config
        ? action.args.config
        : {};

    return visitManager.createVisit$(config);
  }

  run(
    action: ISwagBasicActionConfigCreateVisit,
    visitManager: SwagBasicVisitManager
  ): Promise<any> {
    return this.run$(action, visitManager).toPromise();
  }
}
