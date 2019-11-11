import { SwagVisitEndpointSettings } from './models';
import { Application, Response, Request } from 'express';

let sampleVisitData = {
  test: true,
  test2: 'YO'
};

export class SwagVisitEndpoint {
  createEndpoint(app: Application): void {
    app.post(SwagVisitEndpointSettings.Endpoint, (req, res) => {
      console.log('POSTING');
      this.post(req, res);
    });
    app.get(SwagVisitEndpointSettings.Endpoint, (req, res) => {
      console.log('GETTING');
      this.get(req, res);
    });
  }

  get(req: Request, res: Response) {
    res.json(sampleVisitData);
  }

  post(req: Request, res: Response) {
    sampleVisitData = { ...sampleVisitData, ...req.body };

    console.log(sampleVisitData, req.body);

    res.json(sampleVisitData);
  }
}

export const swagVisitEndpointHandler = new SwagVisitEndpoint();
