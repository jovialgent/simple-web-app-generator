import { ISwagBasicServerManagerPathsType } from '../../server';

export interface ISwagAppClientVisitServer {
  paths: ISwagBasicServerManagerPathsType[];
  root: string;
  data: any;
  defaultHeaders: any;
}
