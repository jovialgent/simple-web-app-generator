import { Observable, of, combineLatest } from 'rxjs';
import { ISwagAppClientVisitServer } from '../../../config';
import { SwagBasicServerManagerUtils } from '../../swag-basic-server-manager-utils';
import {
  ISwagBasicServerManagerPathsVisit,
  ISwagBasicServerManagerPathsVisitSetUp,
  ISwagBasicServerManagerPathsVisitUpdate,
  ISwagBasicServerManagerPathVisit
} from '../../models';
import { map } from 'rxjs/operators';

export class SwagBasicServerVisitManagerSetup {
  run$(
    managerInfo: ISwagBasicServerManagerPathsVisit,
    visitId: string
  ): Observable<ISwagAppClientVisitServer> {
    const paths$: Observable<
      ISwagBasicServerManagerPathsVisit
    > = this._getPaths(managerInfo, visitId);
    const data$: Observable<any> = this._getServerData(
      managerInfo.setUp,
      visitId
    );
    const defaultHeaders: any = {};

    return combineLatest([paths$, data$]).pipe(
      map(
        ([paths, data]: [
          ISwagBasicServerManagerPathsVisit,
          any
        ]): ISwagAppClientVisitServer => {
          return {
            paths,
            data
          };
        }
      )
    );
  }

  private _getPaths(
    paths: ISwagBasicServerManagerPathsVisit,
    visitId: string
  ): Observable<ISwagBasicServerManagerPathsVisit> {
    const setUp: ISwagBasicServerManagerPathsVisitSetUp = paths.setUp;
    const hasSetupRoute = !!setUp.update;
    const defaultPaths$: Observable<ISwagBasicServerManagerPathsVisit> = of({
      setUp,
      update: this._getEmptyUpdate()
    });

    return hasSetupRoute ? this._getPathsUpdate(setUp, visitId) : defaultPaths$;
  }

  private _getPathsUpdate(
    setUp: ISwagBasicServerManagerPathsVisitSetUp,
    visitId: string
  ): Observable<ISwagBasicServerManagerPathsVisit> {
    const path = SwagBasicServerManagerUtils.createFullPath(
      setUp.root,
      setUp.update
    );
    const hasQueryPath: boolean = path.indexOf('?') >= 0;
    const queryPath: string = SwagBasicServerManagerUtils.getQueryStringFromObject(
      { visitId },
      hasQueryPath
    );
    const idPath: string = `${path}${queryPath}`;

    return SwagBasicServerManagerUtils.get$<
      ISwagBasicServerManagerPathsVisitUpdate
    >(idPath).pipe(
      map(
        (
          update: ISwagBasicServerManagerPathsVisitSetUp
        ): ISwagBasicServerManagerPathsVisit => {
          return {
            setUp,
            update
          };
        }
      )
    );
  }

  private _getServerData(
    setUp: ISwagBasicServerManagerPathsVisitSetUp,
    visitId: string
  ): Observable<any> {
    const path = SwagBasicServerManagerUtils.createFullPath(
      setUp.root,
      setUp.data
    );
    const hasQueryPath: boolean = path.indexOf('?') >= 0;
    const queryPath: string = SwagBasicServerManagerUtils.getQueryStringFromObject(
      { visitId },
      hasQueryPath
    );
    const idPath: string = `${path}${queryPath}`;

    return SwagBasicServerManagerUtils.get$<any>(idPath);
  }

  private _getEmptyUpdate(): ISwagBasicServerManagerPathsVisitUpdate {
    return {
      root: '',
      run: { path: '', requiredHeaders: {}, protectedPath: false }
    };
  }
}
