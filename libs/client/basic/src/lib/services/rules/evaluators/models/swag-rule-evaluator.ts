import { ISwagRuleEvaluator } from './swag-rule-evaluator.interface';
import { ISwagBasicRuleObject, ISwagBasicRuleCondition } from '../../models';
import { Observable, of } from 'rxjs';
import { ISwagBasicConfigVisit } from '../../../config/models';
import { ISwagRuleEvaluatorMap } from './swag-rule-evaluator-map.interface';

export class SwagRuleEvaluator implements ISwagRuleEvaluator {
  public evaluatorMap: ISwagRuleEvaluatorMap = {};

  evaluate$(
    condition: ISwagBasicRuleCondition,
    visit: ISwagBasicConfigVisit
  ): Observable<boolean> {
    const evaluator = this.evaluatorMap[`${condition.is}$`];

    return !!evaluator ? evaluator.evaluate$(condition, visit) : of(false);
  }
}
