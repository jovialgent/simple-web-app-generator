import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgSwagActionProcessorService {
  constructor() {}

  process$(): Observable<any> {
    return of({ test: 123 });
  }
}
