import {
  ISwagBasicActionConfig,
  ISwagBasicActionCuepointConfig
} from '../../services';

import { ISwagBasicTemplate } from '../swag-basic-template';

export interface ISwagBasicVideo extends ISwagBasicTemplate {
  id: string;
  onPlay?: ISwagBasicActionConfig[];
  onPause?: ISwagBasicActionConfig[];
  onMute?: ISwagBasicActionConfig[];
  onUnmute?: ISwagBasicActionConfig[];
  onBuffering?: ISwagBasicActionConfig[];
  onTimeupdate?: ISwagBasicActionCuepointConfig[];
  onReady?: ISwagBasicActionConfig[];
}
