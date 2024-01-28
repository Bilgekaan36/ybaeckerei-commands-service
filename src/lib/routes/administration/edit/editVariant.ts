import { Request, Response } from 'express';
import { z } from 'zod';

export const editVariant = () => {
  return async (req: Request, res: Response) => {
    const { variantId, variantTitle } = req.body;

    const VariantSchema = z.object({
      variantId: z.string(),
      variantTitle: z.string(),
    });

    try {
      const validatedVariant = VariantSchema.parse({
        variantId,
        variantTitle,
      });
      // await store.editVariant(validatedVariant);
    } catch (err: any) {
      return res.status(400).end();
    }
    res.json({ variantId });
  };
};
