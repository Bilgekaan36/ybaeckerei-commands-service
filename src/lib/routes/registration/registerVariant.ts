import { Request, Response } from 'express';
import { EventJob } from '../../types/event-job';
import { addJob } from '../../utils/addJob';
import { z } from 'zod';

export const registerVariant = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { variantTitle } = req.body;

    const VariantSchema = z.object({
      variantTitle: z.string(),
    });

    try {
      const validatedVariant = VariantSchema.parse({
        variantTitle,
      });
      const eventJob: EventJob = {
        streamId: 'Variant',
        type: 'VariantRegistered',
        data: validatedVariant,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ variantTitle });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
