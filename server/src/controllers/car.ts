import { Response, Request } from 'express';
import { ICar } from "../types/car";
import { Car, Region, sequelize } from '../db/index';
import { Op } from "sequelize";

const getCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const page: number = Number.parseInt(req.query.page as string || "1");
    const regionId: number = Number.parseInt(req.query.regionId as string);
    const brand: string = req.query.brand as string;
    const query = {
      attributes: ['id', 'brand', [sequelize.col('Region.name'), 'region'], 'createdAt'],
      include: [{
        model: Region,
        as: 'Region',
        attributes: []
      }],
      offset: ((page - 1) * 10),
      limit: 10,
    } as any;

    if (regionId) {
      query.where = { regionId: regionId };
    }

    if (brand) {
      query.where = { ...query.where, brand: { [Op.like]: `%${brand}%` } };
    }

    const result: { rows: Car[]; count: number; } = await Car.findAndCountAll(query);

    res.status(200).json({ cars: result.rows, total: result.count });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

const addCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ICar, 'brand' | 'regionId'>;

    console.log(body)
    const newCar: ICar = await Car.create({
      brand: body.brand,
      regionId: body.regionId,
    });

    res.status(201).json({ message: 'Car added', car: newCar });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    await Car.destroy({ where: { id: req.params.id } });

    res.status(200).json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export { getCars, addCar, deleteCar };
