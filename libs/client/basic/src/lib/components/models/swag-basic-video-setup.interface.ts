import {
  EventBusService,
  SwagBasicActionProcessor,
  SwagBasicTimeupdate
} from '../../services';

import { ISwagBasicVideo } from './swag-basic-video.interface';

export interface ISwagBasicVideoSetup {
  timeupdate: SwagBasicTimeupdate;
  eventBus: EventBusService;
  actionProcessor: SwagBasicActionProcessor;
  player: ISwagBasicVideo;
}
