import { Request, Response } from 'express';
import { EventJob } from '../../../types/event-job';
import { addJob } from '../../../utils/addJob';
import { z } from 'zod';

export const removeImage = ({ eventQueue }: any) => {
  return async (req: Request, res: Response) => {
    const { imageId } = req.body;

    const ImageSchema = z.object({
      imageId: z.string(),
    });

    try {
      const validatedImage = ImageSchema.parse({
        imageId,
      });
      const eventJob: EventJob = {
        streamId: 'Image',
        type: 'ImageRemoved',
        data: validatedImage,
      };

      await addJob({ eventQueue, eventJob });
      res.json({ imageId });
    } catch (err: any) {
      return res.status(400).end();
    }
  };
};
