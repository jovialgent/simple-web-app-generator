import {
  ISwagBasicServerManagerPathsType,
  ISwagBasicServerManagerPathType
} from './models';
import { Observable, Subscriber } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

export class SwagBasicServerManagerUtils {
  public static createFullPath(root: string, pathType: any): string {
    const query = pathType.query ? `${pathType.query}` : '';

    return `${root}${pathType.path}${query}`;
  }

  public static get$<T>(path: string): Observable<T> {
    return ajax(path).pipe(map((results: AjaxResponse) => <T>results.response));
  }
  public static post$<T>(
    path: string,
    body: any,
    headers?: any
  ): Observable<T> {
    console.log(...arguments);
    return ajax
      .post(path, {body})
      .pipe(map((results: AjaxResponse) => <T>results.response));
  }
}
