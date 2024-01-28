import { Request, Response } from 'express';
import { z } from 'zod';

export const removeStore = () => {
  return async (req: Request, res: Response) => {
    const { storeId } = req.body;

    const StoreSchema = z.object({
      storeId: z.string(),
    });

    try {
      const validatedStore = StoreSchema.parse({
        storeId,
      });
      // await store.removeStore(validatedStore);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ storeId });
  };
};
