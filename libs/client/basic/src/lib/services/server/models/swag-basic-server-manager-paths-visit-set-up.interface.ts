import { ISwagBasicServerManagerPathsType } from './swag-basic-server-manager-paths-type.interface';
import { ISwagBasicServerManagerPathVisit } from './swag-basic-server-manager-path-visit.interface';

export interface ISwagBasicServerManagerPathsVisitSetUp
  extends ISwagBasicServerManagerPathsType {
  data: ISwagBasicServerManagerPathVisit;
  update?: ISwagBasicServerManagerPathVisit; 
}
