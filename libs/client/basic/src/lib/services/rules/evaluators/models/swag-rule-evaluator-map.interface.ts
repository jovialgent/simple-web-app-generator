import { ISwagRuleEvaluator } from './swag-rule-evaluator.interface';

export interface ISwagRuleEvaluatorMap {
  [key: string]: ISwagRuleEvaluator;
}
