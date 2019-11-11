import { ISwagBasicServerManagerPathsVisit } from '../../models';
import { ISwagAppClientVisitServer } from '../../../config';
import { Observable } from 'rxjs';
import { SwagBasicServerVisitManagerSetup } from './swag-basic-server-visit-manager-setup';

export class SwagBasicServerVisitManager {
  private _setUpManager: SwagBasicServerVisitManagerSetup;

  constructor() {
    this._setUpManager = new SwagBasicServerVisitManagerSetup();
  }

  setup$(
    managerInfo: ISwagBasicServerManagerPathsVisit,
    visitId: string
  ): Observable<ISwagAppClientVisitServer> {
    return this._setUpManager.run$(managerInfo, visitId);
  }
}
