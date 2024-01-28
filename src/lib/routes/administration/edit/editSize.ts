import { Request, Response } from 'express';
import { z } from 'zod';

export const editSize = () => {
  return async (req: Request, res: Response) => {
    const { sizeId, sizeValue, sizeType } = req.body;

    const SizeSchema = z.object({
      sizeId: z.string(),
      sizeValue: z.number(),
      sizeType: z.string(),
    });

    try {
      const validatedSize = SizeSchema.parse({
        sizeId,
        sizeValue,
        sizeType,
      });
      // await store.editSize(validatedSize);
    } catch (err: any) {
      return res.status(400).end();
    }
    res.json({ sizeId });
  };
};
