import { Observable } from 'rxjs';
import { ISwagBasicRuleObject, ISwagBasicRuleCondition } from '../../models';
import { ISwagAppClientVisit } from '../../../config/models';
import { ISwagRuleEvaluatorMap } from './swag-rule-evaluator-map.interface';

export interface ISwagRuleEvaluator {
  evaluatorMap?: ISwagRuleEvaluatorMap;
  evaluate$(
    condition: ISwagBasicRuleCondition,
    vist: ISwagAppClientVisit
  ): Observable<boolean>;
  [propName: string]: any;
}
