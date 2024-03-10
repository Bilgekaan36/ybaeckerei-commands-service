import { Request, Response } from 'express';
import { EventJob } from '../../types/event-job';
import { addJob } from '../../utils/addJob';
import { z } from 'zod';

export const registerProduct = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const {
      productName,
      productDescription,
      productPrice,
      stockQuantity,
      variantId,
      categoryId,
    } = req.body;

    const ProductSchema = z.object({
      productName: z.string(),
      productDescription: z.string(),
      productPrice: z.number(),
      stockQuantity: z.number(),
      variantId: z.string(),
      categoryId: z.string(),
    });

    try {
      const validatedProduct = ProductSchema.parse({
        productName,
        productDescription,
        productPrice,
        stockQuantity,
        variantId,
        categoryId,
      });
      const eventJob: EventJob = {
        streamId: 'Product',
        type: 'ProductRegistered',
        data: validatedProduct,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ productName });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
