import { ISwagBasicServerManagerMap } from './models';
import { SwagBasicServerVisitManager } from './visit';

export const SwagBasicServerManagerMap: ISwagBasicServerManagerMap = {
  visit: new SwagBasicServerVisitManager()
};
