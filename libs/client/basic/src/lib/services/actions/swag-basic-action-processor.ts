import { Subject, Subscription, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class SwagBasicActionProcessor extends Subject<any> {
  constructor() {
    super();
  }

  process$(actions): Observable<any> {
    return of(actions).pipe(
      tap(data => this.next(data)),
      tap(data => console.log(data))
    );
  }
}
