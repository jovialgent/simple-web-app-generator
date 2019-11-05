import { SwagBasicRules } from '../rules';
import {
  SwagBasicSetup,
  ISwagApp,
  SwagBasicVisitManager,
  ISwagBasicVisit,
  ISwagBasicSetupConfig
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

  public setUpApp$(config: ISwagBasicClientDefault): Observable<ISwagApp> {
    this._setupConfig = {
      services: {
        visit: {
          manager: this.getVisitManager(),
          config: {
            server: {},
            data: {},
            persistent: {}
          }
        },
        rules: {
          manager: this.getRules(),
          config: {
            rulesTypeMap: {}
          }
        }
      }
    };

    return this._setup.setUpApp$(this._setupConfig);
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
