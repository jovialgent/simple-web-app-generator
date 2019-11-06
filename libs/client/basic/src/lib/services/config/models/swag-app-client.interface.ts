import { ISwagAppClientSite } from './swag-app-client-site.interface';
import { ISwagAppClientVisit } from './swag-app-client-visit.interface';


export interface ISwagAppClient {
  site: ISwagAppClientSite;
  visit: ISwagAppClientVisit;
}
