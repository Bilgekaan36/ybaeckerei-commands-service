import { Request, Response } from 'express';
import { z } from 'zod';

export const registerSize = () => {
  return async (req: Request, res: Response) => {
    const { sizeValue, sizeType } = req.body;

    const SizeSchema = z.object({
      sizeValue: z.number(),
      sizeType: z.string(),
    });

    try {
      const validatedSize = SizeSchema.parse({
        sizeValue,
        sizeType,
      });
      // await store.registerSize(validatedSize);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ sizeValue, sizeType });
  };
};
