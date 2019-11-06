import { Observable, of, combineLatest } from 'rxjs';
import {
  ISwagApp,
  ISwagAppClient,
  ISwagAppServer,
  ISwagAppClientSite,
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
    const visit$: Observable<ISwagAppClientVisit> = this.getClientVisit$(
      config
    );

    return combineLatest([site$, visit$]).pipe(
      map(
        ([site, visit]: [
          ISwagAppClientSite,
          ISwagAppClientVisit
        ]) => {
          return {
            site,
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


  public getClientVisit$(
    config: ISwagBasicSetupConfig
  ): Observable<ISwagAppClientVisit> {
    return config.services.visit.manager.createVisit$(
      config.services.visit.config
    );
  }

  public getServer$(config: ISwagBasicSetupConfig): Observable<ISwagAppServer> {
    return of({});
  }
}
