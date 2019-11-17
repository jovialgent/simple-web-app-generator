import { Injectable } from '@angular/core';
import { SwagBasicActionProcessor, ISwagBasicVisit } from '../../../services';
import { Observable } from 'rxjs';
import {
  ISwagBasicActionConfig,
  ISwagActionTypeMap
} from '../../../services/actions/models';
import { NgSwagBasicRulesService } from '../rules';
import { cloneDeep } from 'lodash';
import { NgSwagBasicClientManagerService } from '../client';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicActionsProcessService {
  private _processor: SwagBasicActionProcessor = new SwagBasicActionProcessor();
  constructor(private _appManager: NgSwagBasicClientManagerService) {
    this._processor = new SwagBasicActionProcessor(
      _appManager.getClientManager()
    );
  }

  process$(actions: ISwagBasicActionConfig[]): Observable<ISwagBasicVisit> {
    return this._processor.process$(actions);
  }

  process(actions: ISwagBasicActionConfig[]): Promise<ISwagBasicVisit> {
    return this._processor.process$(actions).toPromise();
  }

  getProcessor(): SwagBasicActionProcessor {
    return this._processor;
  }

  setProcessor(
    newProcessor: SwagBasicActionProcessor
  ): { old: SwagBasicActionProcessor; new: SwagBasicActionProcessor } {
    const oldProcessor: SwagBasicActionProcessor = cloneDeep(this._processor);

    this._processor = newProcessor;

    return { old: oldProcessor, new: newProcessor };
  }

  addActionTypeMap(actionTypeMap: ISwagActionTypeMap): ISwagActionTypeMap {
    return this._processor.addActionType(actionTypeMap);
  }
}
