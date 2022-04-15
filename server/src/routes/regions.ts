import { Router } from 'express';
import { getRegions } from '../controllers/region';

const regionRouter: Router = Router();

regionRouter.get('/all', getRegions);

export { regionRouter };
