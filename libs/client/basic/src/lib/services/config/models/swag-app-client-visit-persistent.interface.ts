export interface ISwagAppClientVisitPersistent {
  persist?: boolean;
  data?: any;
  source?: 'local' | 'session';
  [propName: string]: any;
}
