import { ISwagBasicAction, ISwagBasicActionConfigCreateVisit } from '../models';
import { Observable, of } from 'rxjs';

import { SwagBasicClientManager } from '../../client';

export class SwagBasicActionCreateVisit implements ISwagBasicAction {
  run$(
    action: ISwagBasicActionConfigCreateVisit,
    app: SwagBasicClientManager
  ): Observable<any> {
    const config =
      !!action && !!action.args && !!action.args.config
        ? action.args.config
        : {};

    return app.getVisitManager().createVisit$(config);
  }

  run(
    action: ISwagBasicActionConfigCreateVisit,
    app: SwagBasicClientManager
  ): Promise<any> {
    return this.run$(action, app).toPromise();
  }
}
