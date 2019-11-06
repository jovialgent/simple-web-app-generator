import { ISwagBasicServerManagerPaths } from './swag-basic-server-manager-paths.interface';
import { IncomingHttpHeaders } from 'http';

export interface ISwagBasicServerManager {
  root: string;
  paths: ISwagBasicServerManagerPaths;
  defaultHeader: IncomingHttpHeaders;
}
