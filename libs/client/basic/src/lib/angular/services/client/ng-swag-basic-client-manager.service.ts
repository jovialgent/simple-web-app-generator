import {
  ISwagApp,
  ISwagBasicSetupConfig,
  SwagBasicVisitManager
} from '../../../services';
import {
  ISwagBasicClientDefault,
  SwagBasicClientManager
} from '../../../services/client';

import { Injectable } from '@angular/core';
import { NgSwagBasicRulesService } from '../rules';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicClientManagerService {
  private _clientManager: SwagBasicClientManager;

  constructor(private _rules: NgSwagBasicRulesService) {
    this._clientManager = new SwagBasicClientManager();
  }

  public setUpApp$(config: ISwagBasicSetupConfig): Observable<ISwagApp> {
    return this._clientManager.setUpApp$(config);
  }

  public setClientServices(): NgSwagBasicClientManagerService {
    this._rules.setRules(this._clientManager.getRules());

    return cloneDeep(this);
  }

  public getClientManager(): SwagBasicClientManager {
    return this._clientManager;
  }

  public getVisitManager(): SwagBasicVisitManager {
    return this._clientManager.getVisitManager();
  }
}
