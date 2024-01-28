import { Request, Response } from 'express';
import { z } from 'zod';

export const registerImage = () => {
  return async (req: Request, res: Response) => {
    const { imageTitle, imageUrl } = req.body;

    const ImageSchema = z.object({
      imageTitle: z.string(),
      imageUrl: z.string(),
    });

    try {
      const validatedImage = ImageSchema.parse({
        imageTitle,
        imageUrl,
      });
      // await store.registerImage(validatedImage);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ imageTitle });
  };
};
