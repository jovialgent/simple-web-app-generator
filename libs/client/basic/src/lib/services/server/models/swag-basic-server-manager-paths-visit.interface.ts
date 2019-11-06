import { ISwagBasicServerManagerPathsType } from './swag-basic-server-manager-paths-type.inteface';
import { ISwagBasicServerManagerPathVisit } from './swag-basic-server-manager-path-visit.interface';

export interface ISwagBasicServerManagerPathsVisit
  extends ISwagBasicServerManagerPathsType {
      setUp: ISwagBasicServerManagerPathVisit[];
  }
