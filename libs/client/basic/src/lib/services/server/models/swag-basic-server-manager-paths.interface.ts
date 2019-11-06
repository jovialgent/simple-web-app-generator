import { ISwagBasicServerManagerPathsVisit } from './swag-basic-server-manager-paths-visit.interface';
import { ISwagBasicServerManagerPathsVisitor } from './swag-basic-server-manager-paths-visitor.interface';

export interface ISwagBasicServerManagerPaths {
  visit: ISwagBasicServerManagerPathsVisit;
  visitor: ISwagBasicServerManagerPathsVisitor;
}
