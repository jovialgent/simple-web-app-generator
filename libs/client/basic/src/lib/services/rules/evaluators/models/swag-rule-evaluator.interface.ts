import { Observable } from 'rxjs';
import { ISwagBasicRuleObject, ISwagBasicRuleCondition } from '../../models';
import { ISwagBasicConfigVisit } from '../../../config/models';
import { ISwagRuleEvaluatorMap } from './swag-rule-evaluator-map.interface';

export interface ISwagRuleEvaluator {
  evaluatorMap?: ISwagRuleEvaluatorMap;
  evaluate$(
    condition: ISwagBasicRuleCondition,
    vist: ISwagBasicConfigVisit
  ): Observable<boolean>;
  [propName: string]: any;
}
