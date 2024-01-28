import { Request, Response } from 'express';
import { z } from 'zod';

// Order
// customerId, statusId
// OrderItem
// orderId, products, quantity, subtotal

export const payOrder = () => {
  return async (req: Request, res: Response) => {
    const { orderId } = req.body;

    const OrderSchema = z.object({
      orderId: z.string(),
    });

    try {
      const validatedOrder = OrderSchema.parse({
        orderId,
      });
      // await store.payOrder(validatedOrder);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({});
  };
};
