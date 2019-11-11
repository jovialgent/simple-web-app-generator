import {
  ISwagBasicAction,
  ISwagBasicActionConfigSetVisitServerData
} from '../models';
import { Observable, of } from 'rxjs';
import { SwagBasicClientManager } from '../../client';
import { ISwagBasicVisitManagerServerConfig } from '../../config';

export class SwagBasicActionSetServerData implements ISwagBasicAction {
  run$(
    action: ISwagBasicActionConfigSetVisitServerData,
    app: SwagBasicClientManager
  ): Observable<any> {
    return app
      .getVisitManager()
      .setVisitServerData(action.args.data, action.args.query);
  }

  run(
    action: ISwagBasicActionConfigSetVisitServerData,
    app: SwagBasicClientManager
  ): Promise<any> {
    return this.run$(action, app).toPromise();
  }
}
