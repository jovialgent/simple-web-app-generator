import { SwagVisitEndpointSettings } from './models';
import { Application, Response, Request } from 'express';
import { merge } from 'lodash';

let sampleVisitData = {
  test: true,
  test2: 'YO'
};

export class SwagVisitEndpoint {
  createEndpoint(app: Application): void {
    app.post(SwagVisitEndpointSettings.Endpoint, (req, res) => {
      this.post(req, res);
    });
    app.get(SwagVisitEndpointSettings.Endpoint, (req, res) => {
      this.get(req, res);
    });
  }

  get(req: Request, res: Response) {
    res.json(sampleVisitData);
  }

  post(req: Request, res: Response) {
    sampleVisitData = merge(sampleVisitData, req.body);

    res.json(sampleVisitData);
  }
}

export const swagVisitEndpointHandler = new SwagVisitEndpoint();
