import {
  Subject,
  Subscription,
  Observable,
  of,
  Subscriber,
  combineLatest
} from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
import { SwagBasicInstanceManager, ISwagBasicInstance } from '../config';
import { last } from 'lodash';

export class SwagBasicActionProcessor extends Subject<any> {
  private _subscriber: Subscriber<any>;
  private _instanceManager: SwagBasicInstanceManager;
  constructor() {
    super();
    this._instanceManager = new SwagBasicInstanceManager();
  }

  process$(actions): Observable<ISwagBasicInstance> {
    const actions$: Observable<
      ISwagBasicInstance
    >[] = this._getActionObservables$(actions);
    return combineLatest(actions$).pipe(
      tap(() =>
        this.next({
          processing: true,
          actions,
          instance: this._instanceManager.getInstance()
        })
      ),
      map((instances: ISwagBasicInstance[]) => {
        return last(instances);
      }),
      tap((instance: ISwagBasicInstance) => {
        this.next({
          processing: false,
          actions,
          instance: this._instanceManager.getInstance()
        });
      })
    );
  }

  createInstance$(args: any): Observable<ISwagBasicInstance> {
    return this._instanceManager.createInstance$(args.config);
  }

  setInstanceData$(args: any): Observable<ISwagBasicInstance> {
    const data = !!args.data ? args.data : {};
    return of(this._instanceManager.setInstanceData(data));
  }

  private _getActionObservables$(
    actions: { eventName: string; args: any }[]
  ): Observable<ISwagBasicInstance>[] {
    return actions.map((action: { eventName: string; args: any }) => {
      const action$ = this[`${action.eventName}$`];
      return !!action$
        ? this[`${action.eventName}$`](action.args)
        : of(this._instanceManager.getInstance());
    });
  }
}
