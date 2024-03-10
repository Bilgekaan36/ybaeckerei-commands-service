import { Request, Response } from 'express';
import { EventJob } from '../../../types/event-job';
import { addJob } from '../../../utils/addJob';
import { z } from 'zod';

export const removeVariant = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { variantId } = req.body;

    const VariantSchema = z.object({
      variantId: z.string(),
    });

    try {
      const validatedVariant = VariantSchema.parse({
        variantId,
      });
      const eventJob: EventJob = {
        streamId: 'Variant',
        type: 'VariantRemoved',
        data: validatedVariant,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ variantId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
