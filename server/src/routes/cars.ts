import { Router } from 'express';
import { getCars, addCar, deleteCar } from '../controllers/car';

const carsRouter: Router = Router();

carsRouter.get('/all', getCars);

carsRouter.post('/add', addCar);

carsRouter.delete('/delete/:id', deleteCar);

export { carsRouter };
