import { Request, Response } from 'express';
import { z } from 'zod';
//
export const registerCategory = () => {
  return async (req: Request, res: Response) => {
    const { categoryName, billboardId } = req.body;

    const CategorySchema = z.object({
      categoryName: z.string(),
      billboardId: z.string(),
    });

    try {
      const validatedCategory = CategorySchema.parse({
        categoryName,
        billboardId,
      });
      // await store.registerCategory(validatedCategory);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ categoryName });
  };
};
