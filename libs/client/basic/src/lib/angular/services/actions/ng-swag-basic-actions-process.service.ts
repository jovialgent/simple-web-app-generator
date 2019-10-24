import { Injectable } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { SwagBasicActionProcessor } from '../../../services';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicActionsProcessService {
  private _processor: SwagBasicActionProcessor = new SwagBasicActionProcessor();
  constructor() {}

  process$(actions: any[]): Observable<any> {
    
    return this._processor.process$(actions);;
  }

  subscribe(fn: () => any | void): Subscription {
    return this._processor.subscribe(() => {
      fn();
    });
  }
}
