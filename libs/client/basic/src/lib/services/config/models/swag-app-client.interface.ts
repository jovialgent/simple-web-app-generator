import { ISwagAppClientSite } from './swag-app-client-site.interface';
import { ISwagAppClientVisit } from './swag-app-client-visit.interface';
import { ISwagAppClientVisitor } from './swag-app-client-visitor.interface';

export interface ISwagAppClient {
  site: ISwagAppClientSite;
  visitor: ISwagAppClientVisitor;
  visit: ISwagAppClientVisit;
}
