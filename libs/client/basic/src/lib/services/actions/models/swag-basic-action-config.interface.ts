import { SwagBasicActionConfigEventName } from './swag-basic-action-config-event-names.enum';

export interface ISwagBasicActionConfig{
    eventName: SwagBasicActionConfigEventName | string,
    args?: any;
}