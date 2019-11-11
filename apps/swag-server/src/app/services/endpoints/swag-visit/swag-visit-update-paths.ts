import { SwagVisitEndpointSettings } from './models';
import { Application } from 'express';
import {
  ISwagBasicServerManagerPathsVisitSetUp,
  ISwagBasicServerManagerPathsVisitUpdate,
  ISwagBasicServerManagerPathVisit
} from '@simple-web-app-generator/client/basic';

export class SwagVisitUpdateEndpoint {
  createEndpoint(app: Application): Application {
    return app.get(SwagVisitEndpointSettings.UpdatePaths, (req, res) => {
      this.get(req, res);
    });
  }

  get(req, res) {
    const update: ISwagBasicServerManagerPathsVisitUpdate = this._getUpdatePaths();

    res.json(update);
  }

  private _getUpdatePaths(): ISwagBasicServerManagerPathsVisitUpdate {
    const root: string = this._getRoot();
    const defaultHeaders: any = this._getDefaultHeaders();
    const run: ISwagBasicServerManagerPathVisit = this._getRunPath();

    return {
      root,
      defaultHeaders,
      run
    };
  }

  private _getRoot(): string {
    return 'http://localhost:3333/api/visit';
  }

  private _getDefaultHeaders(): any {
    return {};
  }

  private _getRunPath(): ISwagBasicServerManagerPathVisit {
    const path: SwagVisitEndpointSettings | string = this._getRunPathPath();
    const requiredHeaders: any = this._getRunPathHeaders();
    const protectedPath: boolean = this._getRunPathProtected();

    return {
      path,
      requiredHeaders,
      protectedPath
    };
  }

  private _getRunPathPath(): SwagVisitEndpointSettings | string {
    return '';
  }

  private _getRunPathHeaders(): any {
    return {};
  }

  private _getRunPathProtected(): boolean {
    return false;
  }
}

export const swagVisitUpdateEndpointHandler = new SwagVisitUpdateEndpoint();
