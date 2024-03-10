import { Request, Response } from 'express';
import { EventJob } from '../../types/event-job';
import { addJob } from '../../utils/addJob';
import { z } from 'zod';

export const registerSize = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { sizeValue: sizeValueAsString, sizeType } = req.body;

    const sizeValue = Number(sizeValueAsString);

    const SizeSchema = z.object({
      sizeValue: z.number(),
      sizeType: z.string(),
    });

    try {
      const validatedSize = SizeSchema.parse({
        sizeValue,
        sizeType,
      });
      const eventJob: EventJob = {
        streamId: 'Size',
        type: 'SizeRegistered',
        data: validatedSize,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ sizeValue, sizeType });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
