import { Request, Response } from 'express';
import { z } from 'zod';

export const registerVariant = () => {
  return async (req: Request, res: Response) => {
    const { variantTitle } = req.body;

    const VariantSchema = z.object({
      variantTitle: z.string(),
    });

    try {
      const validatedVariant = VariantSchema.parse({
        variantTitle,
      });
      // await store.registerVariant(validatedVariant);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ variantTitle });
  };
};
