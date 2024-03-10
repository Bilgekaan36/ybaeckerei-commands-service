import { Request, Response } from 'express';
import { EventJob } from '../../../types/event-job';
import { addJob } from '../../../utils/addJob';
import { z } from 'zod';

export const removeProduct = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { productId } = req.body;

    const ProductSchema = z.object({
      productId: z.string(),
    });

    try {
      const validatedProduct = ProductSchema.parse({
        productId,
      });
      const eventJob: EventJob = {
        streamId: 'Product',
        type: 'ProductRemoved',
        data: validatedProduct,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ productId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
