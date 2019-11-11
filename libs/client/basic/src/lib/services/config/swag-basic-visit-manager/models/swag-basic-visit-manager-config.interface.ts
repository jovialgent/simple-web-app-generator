import { ISwagBasicServerManagerPathsVisit } from '../../../server';

export interface ISwagBasicVisitManagerConfig {
  id?: string;
  server?: ISwagBasicServerManagerPathsVisit;
  persistent?: any;
  data?: any;
}
