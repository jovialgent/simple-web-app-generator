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
import { SwagBasicActionCreateVisit } from './basic/swag-basic-action-create-visit';
import { basicActionMap } from './basic';
import { SwagRuleEvaluator, SwagBasicRules } from '../rules';

export class SwagBasicActionProcessor extends Subject<any> {
  public actionTypeMap: ISwagActionTypeMap = {};
  private _subscriber: Subscriber<any>;
  private _visitManager: SwagBasicVisitManager;
  private _emptySwagAction: ISwagAction = {
    run$: (
      action: ISwagBasicActionConfig,
      visitManager: SwagBasicVisitManager
    ) => of(visitManager.getVisit()),
    run: (
      action: ISwagBasicActionConfig,
      visitManager: SwagBasicVisitManager
    ) => of(visitManager.getVisit()).toPromise()
  };
  private _ruleEvaluator: SwagBasicRules;

  constructor(
    ruleEvaluator?: SwagBasicRules,
    actionTypeMap?: ISwagActionTypeMap
  ) {
    super();

    this.actionTypeMap = {
      [SwagBasicActionConfigEventName.Basic]: basicActionMap,
      ...actionTypeMap
    };
    this._visitManager = new SwagBasicVisitManager();
    this._ruleEvaluator = !!ruleEvaluator
      ? ruleEvaluator
      : new SwagBasicRules();
  }

  addActionType(actionTypeMap: ISwagActionTypeMap): ISwagActionTypeMap {
    this.actionTypeMap = {
      ...this.actionTypeMap,
      ...actionTypeMap
    };

    return this.actionTypeMap;
  }

  process$(actions: ISwagBasicActionConfig[]): Observable<ISwagBasicVisit> {
    this.next({
      processing: true,
      actions,
      visit: this._visitManager.getVisit()
    });

    return this._ruleEvaluator
      .evaluateAll$(actions, this._visitManager.getVisit())
      .pipe(
        map((filteredActions: ISwagBasicActionConfig[]) =>
          this._getActionObservables$(<ISwagBasicActionConfig[]>filteredActions)
        ),
        mergeMap(actions$ => combineLatest(actions$)),
        map((visits: ISwagBasicVisit[]) => last(visits)),
        tap((visit: ISwagBasicVisit) => {
          this._visitManager.setVisit(visit);
        }),
        tap((visit: ISwagBasicVisit) =>
          this.next({
            processing: false,
            actions,
            visit: this._visitManager.getVisit()
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
      return swagAction.run$(action, this._visitManager);
    });
  }
}
