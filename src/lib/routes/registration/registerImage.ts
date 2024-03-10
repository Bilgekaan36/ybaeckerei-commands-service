import { Request, Response } from 'express';
import { EventJob } from '../../types/event-job';
import { addJob } from '../../utils/addJob';
import { z } from 'zod';

export const registerImage = ({ eventQueue }: any) => {
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
      const eventJob: EventJob = {
        streamId: 'Image',
        type: 'ImageRegistered',
        data: validatedImage,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ imageTitle });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
