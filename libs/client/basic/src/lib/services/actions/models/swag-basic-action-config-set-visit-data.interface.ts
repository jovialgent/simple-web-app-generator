import { ISwagBasicActionConfig } from './swag-basic-action-config.interface';
import { SwagBasicActionConfigEventName } from './swag-basic-action-config-event-names.enum';

export interface ISwagBasicActionConfigSetVisitData extends ISwagBasicActionConfig{
    eventName: SwagBasicActionConfigEventName.SetVisitData,
    args: {
        data : any
    }
}  