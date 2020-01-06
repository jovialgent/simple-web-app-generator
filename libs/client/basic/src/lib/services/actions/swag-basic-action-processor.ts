import { Subject, Observable, of, Subscriber, combineLatest } from 'rxjs';
import { map, tap, delay, mergeMap } from 'rxjs/operators';
import { SwagBasicVisitManager, ISwagBasicVisit } from '../config';
import { last } from 'lodash';

import {
  ISwagBasicActionConfig,
  ISwagActionMap,
  ISwagAction,
  SwagBasicActionConfigEventName,
  ISwagActionTypeMap
} from './models';
import { basicActionMap } from './basic';
import { SwagBasicClientManager } from '../client';

export class SwagBasicActionProcessor extends Subject<any> {
  public actionTypeMap: ISwagActionTypeMap = {};
  private _appManager: SwagBasicClientManager;
  private _emptySwagAction: ISwagAction = {
    run$: (action: ISwagBasicActionConfig, app: SwagBasicClientManager) =>
      of(app.getVisit()),
    run: (action: ISwagBasicActionConfig, app: SwagBasicClientManager) =>
      of(app.getVisit()).toPromise()
  };

  constructor(
    appManager?: SwagBasicClientManager,
    actionTypeMap?: ISwagActionTypeMap
  ) {
    super();

    this.actionTypeMap = {
      [SwagBasicActionConfigEventName.Basic]: basicActionMap,
      ...actionTypeMap
    };
    this._appManager = !!appManager ? appManager : new SwagBasicClientManager();
  }

  addActionType(actionTypeMap: ISwagActionTypeMap): ISwagActionTypeMap {
    this.actionTypeMap = {
      ...this.actionTypeMap,
      ...actionTypeMap
    };

    return this.actionTypeMap;
  }

  process(actions: ISwagBasicActionConfig[]): Promise<ISwagBasicVisit> {
    return this.process$(actions).toPromise();
  }

  process$(actions: ISwagBasicActionConfig[]): Observable<ISwagBasicVisit> {
    this.next({
      processing: true,
      actions,
      visit: this._appManager.getVisit()
    });

    if (!actions || !actions.length) {
      this.next({
        processing: false,
        actions,
        visit: this._appManager.getVisit()
      });

      return of(this._appManager.getVisit());
    }

    return this._appManager
      .getRules()
      .evaluateAll$(actions, this._appManager.getVisit())
      .pipe(
        map((filteredActions: ISwagBasicActionConfig[]): Observable<
          ISwagBasicVisit
        >[] =>
          this._getActionObservables$(<ISwagBasicActionConfig[]>filteredActions)
        ),
        mergeMap(actions$ => combineLatest(actions$)),
        map((visits: ISwagBasicVisit[]) => last(visits)),
        tap((visit: ISwagBasicVisit) => {
          this._appManager.setVisit(visit);
        }),
        tap((visit: ISwagBasicVisit) =>
          this.next({
            processing: false,
            actions,
            visit: this._appManager.getVisit()
          })
        )
      );
  }

  private _getActionObservables$(
    actions: ISwagBasicActionConfig[]
  ): Observable<ISwagBasicVisit>[] {
    return actions.map((action: ISwagBasicActionConfig) => {
      const actionType: ISwagActionMap = this.actionTypeMap[action.actionType];
      const swagAction: ISwagAction =
        !!actionType && !!actionType[`${action.eventName}`]
          ? actionType[`${action.eventName}`]
          : this._emptySwagAction;
      return swagAction.run$(action, this._appManager);
    });
  }
}
