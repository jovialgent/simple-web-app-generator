import { Observable, of } from 'rxjs';
import { ISwagAppClientVisitServer } from '../../../config';
import { ISwagBasicServerManagerPathsType } from '../../models';

export class SwagBasicServerVisitManager {
  run$(): Observable<ISwagAppClientVisitServer> {
    const paths: ISwagBasicServerManagerPathsType[] = [];
    const root: string = '';
    const data: any = {};
    const defaultHeaders: any = {};
    
    return of({
      paths,
      root,
      data,
      defaultHeaders
    });
  }
}
