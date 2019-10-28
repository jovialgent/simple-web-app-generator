import { Injectable } from '@angular/core';
import { SwagBasicActionProcessor } from '../../../services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicActionsProcessService {
  private _processor: SwagBasicActionProcessor = new SwagBasicActionProcessor();
  constructor() {}

  process$(actions): Observable<any> {
    return this._processor.process$(actions);
  }

  process(actions): Promise<any> {
    return this._processor.process$(actions).toPromise();
  }

  getProcessor(): SwagBasicActionProcessor {
    return this._processor;
  }
}
