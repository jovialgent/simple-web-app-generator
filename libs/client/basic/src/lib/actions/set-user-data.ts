import { Observable, of } from 'rxjs';

export class SetUserDataAction {
  static run$(): Observable<any> {
    return of({ setUpUser: 123 });
  }
}
