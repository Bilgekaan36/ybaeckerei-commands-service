import { Request, Response } from 'express';
import { z } from 'zod';

// Order
// customerId, statusId
// OrderItem
// orderId, products, quantity, subtotal

export const checkoutOrder = () => {
  return async (req: Request, res: Response) => {
    let orderId;
    const { customerId, statusId, products } = req.body;

    const OrderSchema = z.object({
      customerId: z.string(),
      statusId: z.string(),
      products: z.array(
        z.object({
          productId: z.string(),
          quantity: z.number(),
          subtotal: z.number(),
        })
      ),
    });

    try {
      const validatedOrder = OrderSchema.parse({
        customerId,
        statusId,
        products,
      });
      // orderId = await store.checkoutOrder(validatedOrder);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ orderId });
  };
};
