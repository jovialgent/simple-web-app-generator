import { BasicRuleConditionOperator } from './swag-basic-rule-condition-operator.enum';
import { ISwagBasicRuleCondition } from './swag-basic-rule-condition.interface';

export interface ISwagBasicRule {
  conditionOperator: BasicRuleConditionOperator;
  conditions: ISwagBasicRuleCondition[];
  evaluatedToTrue?: boolean;
}
