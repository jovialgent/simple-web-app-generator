import { ISwagAppClient } from './swag-app-client.interface';
import { ISwagAppServer } from './swag-app-server.interface';

export interface ISwagApp {
  client: ISwagAppClient;
  server: ISwagAppServer;
}
