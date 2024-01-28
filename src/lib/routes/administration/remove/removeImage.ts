import { Request, Response } from 'express';
import { z } from 'zod';

export const removeImage = () => {
  return async (req: Request, res: Response) => {
    const { imageId } = req.body;

    const ImageSchema = z.object({
      imageId: z.string(),
    });

    try {
      const validatedImage = ImageSchema.parse({
        imageId,
      });
      // await store.removeImage(validatedImage);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ imageId });
  };
};
