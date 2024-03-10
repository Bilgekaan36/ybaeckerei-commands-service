import { Request, Response } from 'express';
import { EventJob } from '../../../types/event-job';
import { addJob } from '../../../utils/addJob';
import { z } from 'zod';

export const removeCategory = ({ eventQueue }: { eventQueue: any }) => {
  return async (req: Request, res: Response) => {
    const { categoryId } = req.body;

    const CategorySchema = z.object({
      categoryId: z.string(),
    });

    try {
      const validatedCategory = CategorySchema.parse({
        categoryId,
      });
      const eventJob: EventJob = {
        streamId: 'Category',
        type: 'CategoryRemoved',
        data: validatedCategory,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ categoryId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
