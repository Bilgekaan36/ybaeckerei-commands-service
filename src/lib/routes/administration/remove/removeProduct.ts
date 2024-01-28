import { Request, Response } from 'express';
import { z } from 'zod';

export const removeProduct = () => {
  return async (req: Request, res: Response) => {
    const { productId } = req.body;

    const ProductSchema = z.object({
      productId: z.string(),
    });

    try {
      const validatedProduct = ProductSchema.parse({
        productId,
      });
      // await store.removeProduct(validatedProduct);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ productId });
  };
};
