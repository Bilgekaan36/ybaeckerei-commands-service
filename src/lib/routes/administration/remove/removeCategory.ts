import { Request, Response } from 'express';
import { z } from 'zod';

export const removeCategory = () => {
  return async (req: Request, res: Response) => {
    const { categoryId } = req.body;

    const CategorySchema = z.object({
      categoryId: z.string(),
    });

    try {
      const validatedCategory = CategorySchema.parse({
        categoryId,
      });
      // await store.removeCategory(validatedCategory);
    } catch (err: any) {
      return res.status(400).end();
    }
    res.json({ categoryId });
  };
};
