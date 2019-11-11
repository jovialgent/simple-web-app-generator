import { ISwagBasicServerManagerPathsVisitUpdate } from './swag-basic-server-manager-paths-visit-update.interface';
import { ISwagBasicServerManagerPathsVisitSetUp } from './swag-basic-server-manager-paths-visit-set-up.interface';

export interface ISwagBasicServerManagerPathsVisit {
  setUp?: ISwagBasicServerManagerPathsVisitSetUp;
  update: ISwagBasicServerManagerPathsVisitUpdate;
}
