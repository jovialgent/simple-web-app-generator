import { ISwagBasicVisit } from './models';
import { tap, mergeMap, map } from 'rxjs/operators';
import { Observable, of, combineLatest, Subject } from 'rxjs';
import { uniqueId, merge } from 'lodash';
import { ISwagBasicConfigVisitServer } from '../models';

export class SwagBasicVisitManager extends Subject<{
  current: ISwagBasicVisit;
  previous: ISwagBasicVisit;
}> {
  private _visit: ISwagBasicVisit;

  constructor() {
    super();
  }

  public createVisit$(config?: any): Observable<ISwagBasicVisit> {
    return this._createVisitFromConfig$(config).pipe(
      tap((visit: ISwagBasicVisit) => (this._visit = visit))
    );
  }

  public getVisit(): ISwagBasicVisit {
    return { ...this._visit };
  }

  private _createVisitFromConfig$(config: any): Observable<ISwagBasicVisit> {
    const id$: Observable<string> = this._createVisitId$(config);

    return id$.pipe(
      mergeMap((id: string) =>
        combineLatest([
          of(id),
          this._createPersistentData(config, id),
          this._createVisitData(config, id),
          this._createServerData(config.server, id)
        ])
      ),
      map(
        ([id, persistent, data, server]: [
          string,
          any,
          any,
          any
        ]): ISwagBasicVisit => {
          return {
            id,
            persistent,
            data,
            server
          };
        }
      ),
      tap((visit: ISwagBasicVisit) => (this._visit = visit))
    );
  }

  public setVisit(visit: ISwagBasicVisit): ISwagBasicVisit {
    this._visit = { ...visit };

    return visit;
  }

  public setVisitData(data: any): ISwagBasicVisit {
    return this._updateVisit(data, 'data');
  }

  private _updateVisit(
    data: any,
    type: 'data' | 'persistent' | 'server'
  ): ISwagBasicVisit {
    const oldVisit = { ...this._visit };
    const oldData = { ...oldVisit[type] };
    const newData = merge(oldData, data);
    const newVisit = { ...oldVisit };

    newVisit[type] = { ...newData };
    this._visit = { ...newVisit };

    this.next({
      current: { ...this._visit },
      previous: { ...oldVisit }
    });

    return { ...this._visit };
  }

  private _createVisitId$(config: any): Observable<string> {
    return !!config.id ? of(config.id) : of(uniqueId('swag-'));
  }

  private _createPersistentData(config: any, id: string): Observable<any> {
    return of({});
  }
  private _createVisitData(config: any, id: string): Observable<any> {
    return of({});
  }
  private _createServerData(
    configServer: ISwagBasicConfigVisitServer,
    id: string
  ): Observable<any> {
    return of({});
  }
}
