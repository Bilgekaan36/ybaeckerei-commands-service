import { Request, Response } from 'express';
import { EventJob } from '../../types/event-job';
import { addJob } from '../../utils/addJob';
import { z } from 'zod';

export const registerCategory = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { categoryName, billboardId } = req.body;

    const CategorySchema = z.object({
      categoryName: z.string(),
      billboardId: z.string(),
    });

    try {
      const validatedCategory = CategorySchema.parse({
        categoryName,
        billboardId,
      });
      const eventJob: EventJob = {
        streamId: 'Category',
        type: 'CategoryRegistered',
        data: validatedCategory,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ categoryName });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
