import { Observable, of } from 'rxjs';
import { ISwagBasicRuleCondition } from '../models';
import { ISwagBasicVisit } from '../../config';
import { isEqual, get } from 'lodash';
import { delay } from 'rxjs/operators';

export class SwagBasicRulesEvaluatorEquals {
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

export const equalsEvaluator = new SwagBasicRulesEvaluatorEquals();
