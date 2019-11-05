import { Injectable } from '@angular/core';
import {
  SwagBasicClientManager,
  ISwagBasicClientDefault,
} from '../../../services/client';
import { NgSwagBasicRulesService } from '../rules';
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { ISwagApp } from '../../../services';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicClientManagerService {
  private _clientManager: SwagBasicClientManager;

  constructor(
    private _rules: NgSwagBasicRulesService,
  ) {
    this._clientManager = new SwagBasicClientManager();
  }

  public setUpApp$(config: ISwagBasicClientDefault): Observable<ISwagApp> {
    return this._clientManager.setUpApp$(config);
  }

  public setClientServices(): NgSwagBasicClientManagerService {
    this._rules.setRules(this._clientManager.getRules());

    return cloneDeep(this);
  }

  public getClientManager(): SwagBasicClientManager {
    return this._clientManager;
  }
}
