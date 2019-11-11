import { ISwagBasicServerManagerPaths } from './swag-basic-server-manager-paths.interface';

export interface ISwagBasicServerManager {
  root: string;
  paths: ISwagBasicServerManagerPaths;
  defaultHeader: any;
}
