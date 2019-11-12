/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import {
  swagVisitEndpointHandler,
  swagVisitUpdateEndpointHandler
} from './app/services';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to test-backend-for-swag!' });
});

swagVisitEndpointHandler.createEndpoint(app);
swagVisitUpdateEndpointHandler.createEndpoint(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
