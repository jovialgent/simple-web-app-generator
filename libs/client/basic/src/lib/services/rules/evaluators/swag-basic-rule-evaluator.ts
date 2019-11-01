import { ISwagBasicRule } from '../models/swag-basic-rule.interface';
import { ISwagBasicRuleEvaluator } from './models';
import { of, Observable } from 'rxjs';
import { ISwagBasicRuleObject, ISwagBasicRuleCondition } from '../models';
import { SwagRuleEvaluator } from './models/swag-rule-evaluator';
import { equalsEvaluator } from './swag-basic-rule-evaluator-equals';
import { ISwagBasicConfigVisit } from '../../config/models';

export class SwagBasicRuleEvaluator extends SwagRuleEvaluator
  implements ISwagBasicRuleEvaluator {
  constructor() {
    super();
  }

  evaluate$(
    condition: ISwagBasicRuleCondition,
    visit: ISwagBasicConfigVisit
  ): Observable<boolean> {
    const evaluatedFunction = this[`${condition.is}$`];

    return !!evaluatedFunction
      ? evaluatedFunction(condition, visit)
      : of(false);
  }

  equals$(condition, visit): Observable<boolean> {
    return equalsEvaluator.evaluate$(condition, visit);
  }
}
