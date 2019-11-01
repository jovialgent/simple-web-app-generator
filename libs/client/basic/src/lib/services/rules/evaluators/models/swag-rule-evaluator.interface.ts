import { Observable } from 'rxjs';
import { ISwagBasicRuleObject, ISwagBasicRuleCondition } from '../../models';
import { ISwagBasicConfigVisit } from '../../../config/models';

export interface ISwagRuleEvaluator {
  evaluate$(
    conditions: ISwagBasicRuleCondition,
    vist: ISwagBasicConfigVisit
  ): Observable<boolean>;
  [propName: string]: any;
}
