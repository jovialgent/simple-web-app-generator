import { ISwagAppClientVisitServer } from './swag-app-client-visit-server.interface';
import { ISwagAppClientVisitPersistent } from './swag-app-client-visit-persistent.interface';

export interface ISwagAppClientVisit {
  id?: string;
  data?: any;
  server?: ISwagAppClientVisitServer;
  persistent?: ISwagAppClientVisitPersistent;
}
