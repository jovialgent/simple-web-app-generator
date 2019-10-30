import {
  Subject,
  Subscription,
  Observable,
  of,
  Subscriber,
  combineLatest
} from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { SwagBasicVisitManager, ISwagBasicVisit } from '../config';
import { last } from 'lodash';
import { SwagBasicActionSetVisitData } from './swag-basic-action-set-visit-data';
import {
  ISwagBasicActionConfig,
  ISwagBasicActionConfigSetVisitData,
  ISwagBasicActionConfigCreateVisit
} from './models';
import { SwagBasicActionCreateVisit } from './swag-basic-action-create-visit';

export class SwagBasicActionProcessor extends Subject<any> {
  private _subscriber: Subscriber<any>;
  private _visitManager: SwagBasicVisitManager;
  private _setVisitDataAction: SwagBasicActionSetVisitData;
  private _createVisitAction: SwagBasicActionCreateVisit;
  constructor() {
    super();
    this._visitManager = new SwagBasicVisitManager();
    this._setVisitDataAction = new SwagBasicActionSetVisitData();
    this._createVisitAction = new SwagBasicActionCreateVisit();
  }

  process$(actions: ISwagBasicActionConfig[]): Observable<ISwagBasicVisit> {
    const actions$: Observable<ISwagBasicVisit>[] = this._getActionObservables$(
      actions
    );
    return combineLatest(actions$).pipe(
      tap(() =>
        this.next({
          processing: true,
          actions,
          visit: this._visitManager.getVisit()
        })
      ),
      map((visits: ISwagBasicVisit[]) => {
        return last(visits);
      }),
      tap((visit: ISwagBasicVisit) => {
        this.next({
          processing: false,
          actions,
          visit: this._visitManager.getVisit()
        });
      })
    );
  }

  //#region Actions

  /**
   * Creates a visit based on the config passed in
   * @param action : ISwagBasicActionConfigCreateVisit
   */
  createVisit$(
    action: ISwagBasicActionConfigCreateVisit
  ): Observable<ISwagBasicVisit> {
    return this._createVisitAction.run$(action, this._visitManager);
  }

  /**
   * Sets the current local data that doesn't persist after
   * page load.
   * @param action - ISwagBasicActionConfigSetVisitData 
   */
  setVisitData$(
    action: ISwagBasicActionConfigSetVisitData
  ): Observable<ISwagBasicVisit> {
    return this._setVisitDataAction.run$(action, this._visitManager);
  }

  //#endregion Actions

  private _getActionObservables$(
    actions: ISwagBasicActionConfig[]
  ): Observable<ISwagBasicVisit>[] {
    return actions.map((action: ISwagBasicActionConfig) => {
      const action$ = this[`${action.eventName}$`];
      return !!action$
        ? this[`${action.eventName}$`](action)
        : of(this._visitManager.getVisit());
    });
  }
}
