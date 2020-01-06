import { ISwagBasicActionConfig } from './swag-basic-action-config.interface';

export interface ISwagBasicActionCuepointConfig extends ISwagBasicActionConfig {
  start: number;
  end: number;
  always: boolean;
  fired: boolean;
}
