import { of, Observable } from 'rxjs';

export class Setup {
  setupConfig$() : Observable<any>{
    return of({
        test: "THIS IS CONFIG"
    });
  }
}
