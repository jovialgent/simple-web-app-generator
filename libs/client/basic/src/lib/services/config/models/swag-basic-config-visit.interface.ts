import { ISwagBasicConfigVisitServer } from './swag-basic-config-visit-server.interface';

export interface ISwagBasicConfigVisit {
  id?: string;
  data?: any;
  server?: ISwagBasicConfigVisitServer;
  persistent?: ISwagBasicConfigVisitServer;
}
