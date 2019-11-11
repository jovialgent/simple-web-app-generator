import { ISwagBasicServerManagerPathVisit } from './swag-basic-server-manager-path-visit.interface';

export interface ISwagBasicServerManagerPathsType {
  root: string;
  defaultHeaders?: {};
  auth?: ISwagBasicServerManagerPathVisit;
  run: ISwagBasicServerManagerPathVisit;
}
