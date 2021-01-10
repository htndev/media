import { IncomingMessage } from 'http';
import { get } from 'https';

export const fetchFile = (url: string): Promise<Buffer> => {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];

    get(url, (response: IncomingMessage) => {
      response.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      response.once('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });
  });
};
