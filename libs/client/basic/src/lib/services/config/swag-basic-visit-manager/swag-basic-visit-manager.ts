import { ISwagBasicVisit, ISwagBasicVisitManagerConfig } from './models';
import { tap, mergeMap, map } from 'rxjs/operators';
import { Observable, of, combineLatest, Subject } from 'rxjs';
import { uniqueId, merge, get, set } from 'lodash';
import { ISwagAppClientVisitServer } from '../models';
import {
  SwagBasicServerManager,
  ISwagBasicServerManagerPathsVisit,
  SwagBasicServerManagerUtils,
  ISwagBasicServerManagerPathVisit
} from '../../server';

export class SwagBasicVisitManager extends Subject<{
  current: ISwagBasicVisit;
  previous: ISwagBasicVisit;
}> {
  private _visit: ISwagBasicVisit;
  private _serverManager: SwagBasicServerManager;

  constructor() {
    super();

    this._serverManager = new SwagBasicServerManager();
  }

  public createVisit$(
    config?: ISwagBasicVisitManagerConfig
  ): Observable<ISwagBasicVisit> {
    console.log(config);
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

  public setVisitServerData(
    data: any,
    query?: string
  ): Observable<ISwagBasicVisit> {
    const serverVisit: ISwagAppClientVisitServer = this._getServerVisit();
    const runPath: ISwagBasicServerManagerPathVisit = {
      ...serverVisit.paths.update.run,
      query
    };
    const path = SwagBasicServerManagerUtils.createFullPath(
      serverVisit.paths.update.root,
      runPath
    );

    return SwagBasicServerManagerUtils.post$(path, data).pipe(
      map((resData: any) => this._updateVisit(resData, 'server.data'))
    );
  }

  private _updateVisit(
    data: any,
    type: 'data' | 'persistent' | 'server.data'
  ): ISwagBasicVisit {
    const oldVisit = { ...this._visit };
    const oldData = { ...get(oldVisit, type) };
    const newData = merge(oldData, data);
    const newVisit = { ...oldVisit };

    set(newVisit, type, newData);

    this._visit = { ...newVisit };

    this.next({
      current: { ...this._visit },
      previous: { ...oldVisit }
    });

    return { ...this._visit };
  }

  private _createVisitId$(id: string): Observable<string> {
    return !!id ? of(id) : of(this._sampleId());
  }

  private _createPersistentData(config: any, id: string): Observable<any> {
    const oldData : any = localStorage[id] ? JSON.parse(localStorage[id]) : {}; 
        
    return of({});
  }
  private _createVisitData(data: any, id: string): Observable<any> {
    return of(data);
  }
  private _createServerData(
    configServer: ISwagBasicServerManagerPathsVisit,
    id: string
  ): Observable<ISwagAppClientVisitServer> {
    return this._serverManager.setUpVisit$(configServer, id);
  }
  private _createVisitor(configServer: any, id: string): Observable<any> {
    return of({});
  }

  private _getServerVisit(): ISwagAppClientVisitServer {
    const server =
      !!this._visit && !!this._visit.server
        ? this._visit.server
        : this._getEmptyServerVisit();

    return server;
  }

  private _sampleId(): string {
    const randomId = (Math.random() * 10000000000000)
      .toString(36)
      .substring(0, 11)
      .replace('.', '');

    return `swag-${randomId}`;
  }

  private _getEmptyServerVisit(): ISwagAppClientVisitServer {
    return {
      paths: {
        update: {
          root: '',
          run: {
            path: '',
            requiredHeaders: {},
            protectedPath: false
          }
        }
      },
      data: {}
    };
  }
}
