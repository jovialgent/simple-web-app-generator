import { ISwagBasicPage } from '../../models';
import { ISwagBasicVideoNative } from '../../swag-basic-video-native';

export interface ISwagBasicPageVideo extends ISwagBasicPage {
    type: 'basic-video'
  player: ISwagBasicVideoNative;
}
