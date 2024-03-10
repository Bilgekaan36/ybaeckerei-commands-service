import { Request, Response } from 'express';
import { EventJob } from '../../../types/event-job';
import { addJob } from '../../../utils/addJob';
import { z } from 'zod';

export const removeSize = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { sizeId } = req.body;

    const SizeSchema = z.object({
      sizeId: z.string(),
    });

    try {
      const validatedSize = SizeSchema.parse({
        sizeId,
      });
      const eventJob: EventJob = {
        streamId: 'Size',
        type: 'SizeRemoved',
        data: validatedSize,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ sizeId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
