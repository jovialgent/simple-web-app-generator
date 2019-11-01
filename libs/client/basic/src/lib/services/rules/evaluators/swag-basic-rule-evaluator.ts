import { ISwagBasicRule } from '../models/swag-basic-rule.interface';
import { ISwagBasicRuleEvaluator, ISwagRuleEvaluator } from './models';
import { of, Observable } from 'rxjs';
import { ISwagBasicRuleObject, ISwagBasicRuleCondition } from '../models';
import { SwagRuleEvaluator } from './models/swag-rule-evaluator';
import { SwagBasicRulesEvaluatorEquals } from './swag-basic-rule-evaluator-equals';
import { ISwagBasicConfigVisit } from '../../config/models';
import { SwagBasicRuleEvaluatorContains } from './swag-basic-rule-evaluator-contains';

export class SwagBasicRuleEvaluator extends SwagRuleEvaluator
  implements ISwagRuleEvaluator {
  constructor() {
    super();

    this.evaluatorMap = {
      equals$: new SwagBasicRulesEvaluatorEquals(),
      contains: new SwagBasicRuleEvaluatorContains()
    };
  }

 
}
