import { ISwagBasicInstance } from './models';
import { tap, mergeMap, map } from 'rxjs/operators';
import { Observable, of, combineLatest, Subject } from 'rxjs';
import { uniqueId, merge } from 'lodash';

export class SwagBasicInstanceManager extends Subject<{
  current: ISwagBasicInstance;
  previous: ISwagBasicInstance;
}> {
  private _instance: ISwagBasicInstance;

  constructor() {
    super();
  }

  public createInstance$(config?: any): Observable<ISwagBasicInstance> {
    return this._createInstanceFromConfig$(config).pipe(
      tap((instance: ISwagBasicInstance) => (this._instance = instance))
    );
  }

  public getInstance(): ISwagBasicInstance {
    return { ...this._instance };
  }

  private _createInstanceFromConfig$(
    config: any
  ): Observable<ISwagBasicInstance> {
    const id$: Observable<string> = this._createInstanceId$(config);

    return id$.pipe(
      mergeMap((id: string) =>
        combineLatest([
          of(id),
          this._createPersistentData(config, id),
          this._createInstanceData(config, id),
          this._createServerData(config, id)
        ])
      ),
      map(
        ([id, persistentData, data, serverData]: [
          string,
          any,
          any,
          any
        ]): ISwagBasicInstance => {
          return {
            id,
            persistentData,
            data,
            serverData
          };
        }
      ),
      tap((instance: ISwagBasicInstance) => (this._instance = instance))
    );
  }

  public setInstanceData(data: any): ISwagBasicInstance {
    const oldInstance = { ...this._instance };
    const oldData = { ...oldInstance.data };
    const newData = merge(oldData, data);

    this._instance.data = { ...newData };

    this.next({
      current: { ...this._instance },
      previous: { ...oldInstance }
    });

    return { ...this._instance };
  }

  private _createInstanceId$(config: any): Observable<string> {
    return !!config.id ? of(config.id) : of(uniqueId('swag-'));
  }

  private _createPersistentData(config: any, id: string): Observable<any> {
    return of({});
  }
  private _createInstanceData(config: any, id: string): Observable<any> {
    return of({});
  }
  private _createServerData(config: any, id: string): Observable<any> {
    return of({});
  }
}
