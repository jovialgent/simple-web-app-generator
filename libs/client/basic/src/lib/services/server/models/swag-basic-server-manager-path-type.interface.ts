export interface ISwagBasicServerManagerPathType {
  path: string;
  url?: string;
  query?: any;
  method?: 'GET' | 'POST' | 'PUT';
  requiredHeaders?: any;
  protectedPath?: boolean;
  body?: any;
}
