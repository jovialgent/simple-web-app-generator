import { ISwagBasicServerManagerPathType } from '../../../server';

export interface ISwagBasicVisitManagerServerConfig {
  root: string;
  path: ISwagBasicServerManagerPathType;
  data: any;
  header?: any;
}
