import 'dotenv/config';
import express, { Express } from 'express';
import { routesSetup } from './config/routes';
import { middlewareSetup } from './config/middlewares';
import { sequelize } from './db/index';

const PORT: string | number = process.env.PORT || 5000;

const app: Express = express();

sequelize
  .authenticate()
  .then(() => console.log('Database connected...'));

middlewareSetup(app);
routesSetup(app);

try {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log(`Error occurred: ${(error as Error).message}`);
}