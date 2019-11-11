import { SwagBasicServerManagerMap } from './managers';
import { Observable } from 'rxjs';
import { ISwagAppClientVisitServer } from '../config';
import { ISwagBasicServerManagerPathsVisit } from './models';

export class SwagBasicServerManager {
  private _basicServerManager: any;

  constructor() {
    this._basicServerManager = SwagBasicServerManagerMap;
  }

  setUpVisit$(
    managerInfo: ISwagBasicServerManagerPathsVisit,
    visitId: string
  ): Observable<ISwagAppClientVisitServer> {
    return this._basicServerManager.visit.setup$(managerInfo, visitId);
  }
}
