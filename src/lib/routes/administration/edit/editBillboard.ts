import { Request, Response } from 'express';
import { z } from 'zod';

export const editBillboard = () => {
  return async (req: Request, res: Response) => {
    const { billboardId, billboardTitle, billboardImageUrl } = req.body;

    const BillboardSchema = z.object({
      billboardId: z.string(),
      billboardTitle: z.string(),
      billboardImageUrl: z.string(),
    });

    try {
      const validatedBillboard = BillboardSchema.parse({
        billboardId,
        billboardTitle,
        billboardImageUrl,
      });
      // await store.editBillboard(validatedBillboard);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ billboardId });
  };
};
