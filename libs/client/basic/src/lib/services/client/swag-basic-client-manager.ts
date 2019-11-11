import { SwagBasicRules } from '../rules';
import {
  SwagBasicSetup,
  ISwagApp,
  SwagBasicVisitManager,
  ISwagBasicVisit,
  ISwagBasicSetupConfig,
  ISwagAppClient,
  ISwagAppServer
} from '../config';
import { ISwagBasicClientDefault } from './models';
import { Observable } from 'rxjs';

export class SwagBasicClientManager {
  private _rules: SwagBasicRules;
  private _setup: SwagBasicSetup;
  private _visit: SwagBasicVisitManager;
  private _client: ISwagApp;
  private _setupConfig: ISwagBasicSetupConfig;

  constructor(defaults?: ISwagBasicClientDefault) {
    this._setup = new SwagBasicSetup();
    this._rules = new SwagBasicRules();
    this._visit = new SwagBasicVisitManager();
  }

  public setUpApp$(config: ISwagBasicSetupConfig): Observable<ISwagApp> {

    const updatedConfig: ISwagBasicSetupConfig = { ...config };

    updatedConfig.services.visit.manager = this.getVisitManager();
    updatedConfig.services.rules.manager = this.getRules();
    return this._setup.setUpApp$(config);
  }

  public getRules(): SwagBasicRules {
    return this._rules;
  }

  public getVisitManager(): SwagBasicVisitManager {
    return this._visit;
  }

  public getVisit(): ISwagBasicVisit {
    return this._visit.getVisit();
  }

  public setVisit(visit: ISwagBasicVisit): ISwagBasicVisit {
    return this._visit.setVisit(visit);
  }
}
