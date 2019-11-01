import { Observable, of } from 'rxjs';
import { ISwagBasicRuleCondition } from '../models';
import { ISwagBasicVisit } from '../../config';
import { includes, get } from 'lodash';
import { ISwagBasicRuleEvaluator } from './models';

export class SwagBasicRuleEvaluatorContains implements ISwagBasicRuleEvaluator {
  evaluate$(
    condition: ISwagBasicRuleCondition,
    visit: ISwagBasicVisit
  ): Observable<boolean> {
    const testValue = get(visit, condition.key);
    const evaluateValue = condition.value;
    const contains: boolean = includes(testValue, evaluateValue);

    return of(contains);
  }
}
