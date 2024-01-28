import { Request, Response } from 'express';
import { z } from 'zod';

export const editCategory = () => {
  return async (req: Request, res: Response) => {
    const { categoryId, categoryName, billboardId } = req.body;

    const CategorySchema = z.object({
      categoryId: z.string(),
      categoryName: z.string(),
      billboardId: z.string(),
    });

    try {
      const validatedCategory = CategorySchema.parse({
        categoryId,
        categoryName,
        billboardId,
      });
      // await store.editCategory(validatedCategory);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ categoryId });
  };
};
