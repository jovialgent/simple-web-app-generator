import { ISwagBasicAction, ISwagBasicActionConfigSetVisitData } from './models';
import { Observable, of } from 'rxjs';
import { SwagBasicVisitManager } from '../config';

export class SwagBasicActionSetVisitData implements ISwagBasicAction {
  constructor() {}

  run$(
    action: ISwagBasicActionConfigSetVisitData,
    visitManager: SwagBasicVisitManager
  ): Observable<any> {
    const data =
      !!action && !!action.args && !!action.args.data ? action.args.data : {};

    return of(visitManager.setVisitData(data));
  }

  run(
    action: ISwagBasicActionConfigSetVisitData,
    visitManager: SwagBasicVisitManager
  ): Promise<any> {
    return this.run$(action, visitManager).toPromise();
  }
}
