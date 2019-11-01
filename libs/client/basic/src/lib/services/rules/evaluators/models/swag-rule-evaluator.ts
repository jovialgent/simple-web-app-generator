import { ISwagRuleEvaluator } from './swag-rule-evaluator.interface';
import { ISwagBasicRuleObject, ISwagBasicRuleCondition } from '../../models';
import { Observable, of } from 'rxjs';
import { ISwagBasicConfigVisit } from '../../../config/models';

export class SwagRuleEvaluator implements ISwagRuleEvaluator {
  evaluate$(condition : ISwagBasicRuleCondition, vist : ISwagBasicConfigVisit): Observable<boolean> {
    return of(true);
  }
}
