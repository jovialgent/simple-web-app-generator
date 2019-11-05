import {
  ISwagBasicAction,
  ISwagBasicActionConfigSetVisitData
} from '../models';
import { Observable, of } from 'rxjs';
import { SwagBasicClientManager } from '../../client';

export class SwagBasicActionSetVisitData implements ISwagBasicAction {
  constructor() {}

  run$(
    action: ISwagBasicActionConfigSetVisitData,
    app: SwagBasicClientManager
  ): Observable<any> {
    const data =
      !!action && !!action.args && !!action.args.data ? action.args.data : {};

    return of(app.getVisitManager().setVisitData(data));
  }

  run(
    action: ISwagBasicActionConfigSetVisitData,
    app: SwagBasicClientManager
  ): Promise<any> {
    return this.run$(action, app).toPromise();
  }
}
