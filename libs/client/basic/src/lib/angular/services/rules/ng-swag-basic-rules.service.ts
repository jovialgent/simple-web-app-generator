import { Injectable } from '@angular/core';
import {
  SwagBasicRules,
  ISwagBasicRuleObject,
  ISwagBasicVisit,
  BasicRuleConditionOperator
} from '../../../services';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicRulesService {
  private _swagRuleService = new SwagBasicRules();
  constructor() {}

  evaluateFirst$(
    rules: ISwagBasicRuleObject[],
    visit: ISwagBasicVisit
  ): Observable<ISwagBasicRuleObject> {
    return this._swagRuleService.evaluateFirst$(rules, visit);
  }

  evaluateAll$(
    rules: ISwagBasicRuleObject[],
    visit: ISwagBasicVisit
  ): Observable<ISwagBasicRuleObject[]> {
    return this._swagRuleService.evaluateAll$(rules, visit);
  }
}
