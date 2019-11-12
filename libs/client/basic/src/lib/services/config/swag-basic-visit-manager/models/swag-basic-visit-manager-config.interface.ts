import { ISwagBasicServerManagerPathsVisit } from '../../../server';
import { ISwagAppClientVisitPersistent } from '../../models';

export interface ISwagBasicVisitManagerConfig {
  id?: string;
  server?: ISwagBasicServerManagerPathsVisit;
  persistent?: ISwagAppClientVisitPersistent;
  data?: any;
}
