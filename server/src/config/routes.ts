import { Express } from 'express';
import { carsRouter } from '../routes/cars';
import { regionRouter } from '../routes/regions';

const routesSetup = (app: Express) => {
  app.use('/api/cars', carsRouter);
  app.use('/api/regions', regionRouter);
};

export { routesSetup };
