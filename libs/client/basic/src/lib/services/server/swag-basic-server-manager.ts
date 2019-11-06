import {
  SwagBasicServerManagerMap,
  ISwagBasicServerManagerMap
} from './managers';
import { Observable } from 'rxjs';
import { ISwagAppClientVisitServer } from '../config';

export class SwagBasicServerManager {
  private _basicServerManager: ISwagBasicServerManagerMap;

  constructor() {
    this._basicServerManager = SwagBasicServerManagerMap;
  }

  setup$() {}

  setUpVisit$(): Observable<ISwagAppClientVisitServer> {
    return this._basicServerManager.visit.run$();
  }
}
