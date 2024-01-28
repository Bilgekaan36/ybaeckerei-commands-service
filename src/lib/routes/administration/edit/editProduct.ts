import { Request, Response } from 'express';
import { z } from 'zod';

export const editProduct = () => {
  return async (req: Request, res: Response) => {
    const {
      productId,
      productName,
      productDescription,
      productPrice,
      stockQuantity,
      variantId,
      categoryId,
    } = req.body;

    const ProductSchema = z.object({
      productId: z.string(),
      productName: z.string(),
      productDescription: z.string(),
      productPrice: z.number(),
      stockQuantity: z.number(),
      variantId: z.string(),
      categoryId: z.string(),
    });

    try {
      const validatedProduct = ProductSchema.parse({
        productId,
        productName,
        productDescription,
        productPrice,
        stockQuantity,
        variantId,
        categoryId,
      });
      // await store.editProduct(validatedProduct);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ productId });
  };
};
