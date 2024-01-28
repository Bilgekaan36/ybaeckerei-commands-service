import { Request, Response } from 'express';
import { z } from 'zod';

export const editImage = () => {
  return async (req: Request, res: Response) => {
    const { imageId, imageTitle, imageUrl } = req.body;

    const ImageSchema = z.object({
      imageId: z.string(),
      imageTitle: z.string(),
      imageUrl: z.string(),
    });

    try {
      const validatedImage = ImageSchema.parse({
        imageId,
        imageTitle,
        imageUrl,
      });
      // await store.editImage(validatedImage);
    } catch (err: any) {
      return res.status(400).end();
    }

    res.json({ imageId });
  };
};
