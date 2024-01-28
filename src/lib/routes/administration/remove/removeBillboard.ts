import { Request, Response } from 'express';
import { z } from 'zod';

export const removeBillboard = () => {
  return async (req: Request, res: Response) => {
    const { billboardId } = req.body;
    const BillboardSchema = z.object({
      billboardId: z.string(),
    });

    try {
      const validatedBillboard = BillboardSchema.parse({
        billboardId,
      });
      // await store.removeBillboard(validatedBillboard);
    } catch (err: any) {
      return res.status(400).end();
    }
    res.json({ billboardId });
  };
};
