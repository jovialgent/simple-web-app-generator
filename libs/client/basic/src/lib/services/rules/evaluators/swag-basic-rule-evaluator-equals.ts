import { Observable, of } from 'rxjs';
import { get, isEqual } from 'lodash';

import { ISwagBasicRuleCondition } from '../models';
import { ISwagBasicRuleEvaluator } from './models';
import { ISwagBasicVisit } from '../../config';

export class SwagBasicRulesEvaluatorEquals implements ISwagBasicRuleEvaluator {
  evaluate$(
    condition: ISwagBasicRuleCondition,
    visit: ISwagBasicVisit
  ): Observable<boolean> {
    const testValue = get(visit, condition.key);
    const evaluateValue = condition.value;
    const equals: boolean = isEqual(testValue, evaluateValue);

    return of(equals);
  }
}
