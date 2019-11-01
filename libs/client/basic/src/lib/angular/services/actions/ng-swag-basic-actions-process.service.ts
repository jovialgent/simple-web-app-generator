import { Injectable } from '@angular/core';
import { SwagBasicActionProcessor } from '../../../services';
import { Observable } from 'rxjs';
import {
  ISwagBasicActionConfig,
  ISwagActionTypeMap
} from '../../../services/actions/models';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicActionsProcessService {
  private _processor: SwagBasicActionProcessor = new SwagBasicActionProcessor();
  constructor() {}

  process$(actions: ISwagBasicActionConfig[]): Observable<any> {
    return this._processor.process$(actions);
  }

  process(actions: ISwagBasicActionConfig[]): Promise<any> {
    return this._processor.process$(actions).toPromise();
  }

  getProcessor(): SwagBasicActionProcessor {
    return this._processor;
  }
  addActionTypeMap(actionTypeMap: ISwagActionTypeMap): ISwagActionTypeMap {
    return this._processor.addActionType(actionTypeMap);
  }
}
