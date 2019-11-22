import {
  ISwagBasicServerManagerPathsType,
  ISwagBasicServerManagerPathType
} from './models';
import { Observable, Subscriber } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { isString } from 'lodash';
import { isObject } from 'util';

export class SwagBasicServerManagerUtils {
  public static createFullPath(root: string, pathType: any): string {
    const query = this._getQueryString(pathType.query);

    return `${root}${pathType.path}${query}`;
  }

  public static get$<T>(path: string): Observable<T> {
    return ajax(path).pipe(map((results: AjaxResponse) => <T>results.response));
  }

  public static request$<T>(pathSettings: ISwagBasicServerManagerPathType) {}

  public static post$<T>(
    path: string,
    body: any,
    headers?: any
  ): Observable<T> {
    return ajax
      .post(path, body)
      .pipe(map((results: AjaxResponse) => <T>results.response));
  }

  public static getQueryStringFromObject(query: any, append?: boolean): string {
    const queryParams: string = Object.keys(query)
      .map((key: string) => this._createQueryParts(key, query[key]))
      .join('&');

    return `${append ? '&' : '?'}${queryParams}`;
  }

  private static _getQueryString(query: any): string {
    const hasQuery = !!query;
    const isQueryString = isString(query) && query[0] === '?';
    const isQueryObject = hasQuery && isObject(query);
    return hasQuery && isQueryString
      ? query
      : hasQuery && isQueryObject
      ? this.getQueryStringFromObject(query)
      : '';
  }

  private static _createQueryParts(key, value): string {
    const encodedKey: string = encodeURIComponent(key);
    const encodedValue: string = encodeURIComponent(value);

    return `${encodedKey}=${encodedValue}`;
  }
}
