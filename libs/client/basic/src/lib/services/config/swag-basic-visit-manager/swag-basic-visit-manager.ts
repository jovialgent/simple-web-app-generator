import { ISwagBasicVisit, ISwagBasicVisitManagerConfig } from './models';
import { tap, mergeMap, map } from 'rxjs/operators';
import { Observable, of, combineLatest, Subject } from 'rxjs';
import { uniqueId, merge } from 'lodash';
import { ISwagAppClientVisitServer } from '../models';

export class SwagBasicVisitManager extends Subject<{
  current: ISwagBasicVisit;
  previous: ISwagBasicVisit;
}> {
  private _visit: ISwagBasicVisit;

  constructor() {
    super();
  }

  public createVisit$(
    config?: ISwagBasicVisitManagerConfig
  ): Observable<ISwagBasicVisit> {
    const mappedConfig: ISwagBasicVisitManagerConfig = this._getDefaultConfig(
      config
    );
    return this._createVisitFromConfig$(mappedConfig).pipe(
      tap((visit: ISwagBasicVisit) => (this._visit = visit))
    );
  }

  public getVisit(): ISwagBasicVisit {
    return { ...this._visit };
  }

  private _getDefaultConfig(
    config?: ISwagBasicVisitManagerConfig
  ): ISwagBasicVisitManagerConfig {
    const emptyConfig: ISwagBasicVisitManagerConfig = {};

    return !!config ? config : emptyConfig;
  }

  private _createVisitFromConfig$(
    config: ISwagBasicVisitManagerConfig
  ): Observable<ISwagBasicVisit> {
    const id$: Observable<string> = this._createVisitId$(config.id);

    return id$.pipe(
      mergeMap((id: string) =>
        combineLatest([
          of(id),
          this._createPersistentData(config.persistent, id),
          this._createVisitData(config.data, id),
          this._createServerData(config.server, id),
          this._createVisitor(config.server, id)
        ])
      ),
      map(
        ([id, persistent, data, server, visitor]: [
          string,
          any,
          any,
          any,
          any
        ]): ISwagBasicVisit => {
          return {
            id,
            persistent,
            data,
            server,
            visitor
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

  private _createVisitId$(id: string): Observable<string> {
    return !!id ? of(id) : of(uniqueId('swag-'));
  }

  private _createPersistentData(config: any, id: string): Observable<any> {
    return of({});
  }
  private _createVisitData(config: any, id: string): Observable<any> {
    return of({});
  }
  private _createServerData(configServer: any, id: string): Observable<ISwagAppClientVisitServer> {
    return of({
      paths:[],
      root:"",
      data:{},
      defaultHeaders:{}
    });
  }
  private _createVisitor(configServer: any, id: string): Observable<any> {
    return of({});
  }
}
