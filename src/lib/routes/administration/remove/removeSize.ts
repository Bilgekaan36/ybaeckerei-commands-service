import { Request, Response } from 'express';
import { z } from 'zod';

export const removeSize = () => {
  return async (req: Request, res: Response) => {
    const { sizeId } = req.body;

    const SizeSchema = z.object({
      sizeId: z.string(),
    });

    try {
      const validatedSize = SizeSchema.parse({
        sizeId,
      });
      // await store.removeSize(validatedSize);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ sizeId });
  };
};
