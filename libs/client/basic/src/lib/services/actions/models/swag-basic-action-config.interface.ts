import { SwagBasicActionConfigEventName } from './swag-basic-action-config-event-names.enum';
import { ISwagBasicRule } from '../../rules';

export interface ISwagBasicActionConfig {
  actionType: string | 'basic';
  eventName: SwagBasicActionConfigEventName | string;
  args?: any;
  rule?: ISwagBasicRule
}
