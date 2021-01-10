import { Response } from 'express';
import { Readable } from 'stream';

export const sendFile = (response: Response, { buffer, mimetype }: { buffer: Buffer; mimetype: string }): void => {
  const stream = new Readable();

  stream.push(buffer);
  stream.push(null);

  response.set({
    'Content-Type': mimetype,
    'Content-Length': buffer.length
  });

  stream.pipe(response);
};
