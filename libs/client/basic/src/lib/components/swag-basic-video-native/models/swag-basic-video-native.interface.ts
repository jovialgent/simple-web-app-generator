import { ISwagBasicVideo } from '../../models';
import { ISwagBasicVideoNativeRender } from './swag-basic-video-native-render.interface';

export interface ISwagBasicVideoNative extends ISwagBasicVideo {
  type: 'basic-native';
  src: string;
  renderData?: ISwagBasicVideoNativeRender;
}
