import { Request, Response } from 'express';
import { z } from 'zod';

export const registerProduct = () => {
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
      // await store.registerProduct(validatedProduct);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ productName });
  };
};
