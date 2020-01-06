import { ISwagBasicActionConfig } from '../../services';

export interface ISwagBasicVideoEventArgs {
  id?: string;
  level?: number;
  currentTime?: number;
  duration?: number;
  progress?: number;
  timestamp?: string;
  durationTimestamp?: string;
  actions?: ISwagBasicActionConfig[];
}
