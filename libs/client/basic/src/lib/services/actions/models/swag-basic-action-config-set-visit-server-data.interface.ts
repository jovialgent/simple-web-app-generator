import { ISwagBasicActionConfig } from './swag-basic-action-config.interface';
import { SwagBasicActionConfigEventName } from './swag-basic-action-config-event-names.enum';
import { ISwagBasicVisitManagerServerConfig } from '../../config';

export interface ISwagBasicActionConfigSetVisitServerData
  extends ISwagBasicActionConfig {
  eventName: SwagBasicActionConfigEventName.SetVisitServerData;
  args: {
    data: {};
    query?: string;
  };
}
