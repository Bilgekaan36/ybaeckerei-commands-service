import { Request, Response } from 'express';
import { z } from 'zod';

export const removeVariant = () => {
  return async (req: Request, res: Response) => {
    const { variantId } = req.body;

    const VariantSchema = z.object({
      variantId: z.string(),
    });

    try {
      const validatedVariant = VariantSchema.parse({
        variantId,
      });
      // await store.removeVariant(validatedVariant);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ variantId });
  };
};
