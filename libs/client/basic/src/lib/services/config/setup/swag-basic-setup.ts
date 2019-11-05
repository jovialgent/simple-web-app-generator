import { Observable, of, combineLatest } from 'rxjs';
import {
  ISwagApp,
  ISwagAppClient,
  ISwagAppServer,
  ISwagAppClientSite,
  ISwagAppClientVisitor,
  ISwagAppClientVisit
} from '../models';
import { ISwagBasicSetupConfig } from './models';
import { map } from 'rxjs/operators';

export class SwagBasicSetup {
  public setUpApp$(config: ISwagBasicSetupConfig): Observable<ISwagApp> {
    const client$: Observable<ISwagAppClient> = this.getClient$(config);
    const server$: Observable<ISwagAppServer> = this.getServer$(config);

    return combineLatest([client$, server$]).pipe(
      map(([client, server]: [ISwagAppClient, ISwagAppServer]) => {
        return {
          client,
          server
        };
      })
    );
  }

  public getClient$(config: ISwagBasicSetupConfig): Observable<ISwagAppClient> {
    const site$: Observable<ISwagAppClientSite> = this.getClientSite$(config);
    const visitor$: Observable<ISwagAppClientVisitor> = this.getClientVisitor$(
      config
    );
    const visit$: Observable<ISwagAppClientVisit> = this.getClientVisit$(
      config
    );

    return combineLatest([site$, visitor$, visit$]).pipe(
      map(
        ([site, visitor, visit]: [
          ISwagAppClientSite,
          ISwagAppClientVisitor,
          ISwagAppClientVisit
        ]) => {
          return {
            site,
            visitor,
            visit
          };
        }
      )
    );
  }

  public getClientSite$(
    config: ISwagBasicSetupConfig
  ): Observable<ISwagAppClientSite> {
    return of({});
  }

  public getClientVisitor$(
    config: ISwagBasicSetupConfig
  ): Observable<ISwagAppClientVisitor> {
    return of({});
  }

  public getClientVisit$(
    config: ISwagBasicSetupConfig
  ): Observable<ISwagAppClientVisitor> {
    return config.services.visit.manager.createVisit$(
      config.services.visit.config
    );
  }

  public getServer$(config: ISwagBasicSetupConfig): Observable<ISwagAppServer> {
    return of({});
  }
}
