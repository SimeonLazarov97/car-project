import { Response, Request } from 'express';
import { IRegion } from "../types/region";
import { Region } from '../db/index';

const getRegions = async (req: Request, res: Response): Promise<void> => {
    try {
        const regions: IRegion[] = await Region.findAll();
        res.status(200).json({ regions });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export { getRegions }
