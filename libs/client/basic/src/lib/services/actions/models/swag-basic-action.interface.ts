import { Observable } from 'rxjs';

export interface ISwagBasicAction {
   run$: (...args:any[]) => Observable<any>;
   run: (...args:any[]) => Promise<any>;
}
