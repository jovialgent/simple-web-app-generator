import { ISwagBasicActionConfig } from './swag-basic-action-config.interface';
import { SwagBasicActionConfigEventName } from './swag-basic-action-config-event-names.enum';
import { ISwagAppClientVisit } from '../../config/models';

export interface ISwagBasicActionConfigCreateVisit extends ISwagBasicActionConfig{
    eventName: SwagBasicActionConfigEventName.CreateVisit,
    args: {
        config: ISwagAppClientVisit
    }
}  