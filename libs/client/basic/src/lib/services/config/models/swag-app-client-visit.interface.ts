import { ISwagAppClientVisitServer } from './swag-app-client-visit-server.interface';
import { ISwagAppClientVisitPersistent } from './swag-app-client-visit-persistent.interface';
import { ISwagAppClientVisitVisitor } from './swag-app-client-visit-visitor.interface';

export interface ISwagAppClientVisit {
  id: string;
  data: any;
  server?: ISwagAppClientVisitServer;
  persistent?: ISwagAppClientVisitPersistent;
  visitor?: ISwagAppClientVisitVisitor;
}
