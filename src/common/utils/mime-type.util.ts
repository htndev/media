import { Nullable } from '@xbeat/toolkit';

import { AUDIO_MIMETYPE, IMAGE_MIMETYPE } from '../constants/file-formats.constants';
import { File, UploadFile } from './types.util';

export const mimeTypeRegexp = (type: string, formats: string[]): RegExp =>
  new RegExp(`${type}\/(${formats.join('|')})`);

export const generateMimetypeValidator = (type: string, formats: string[]): ((mimetype: string) => boolean) => (
  mimetype: string
): boolean => mimeTypeRegexp(type, formats).test(mimetype);

export const isImage = generateMimetypeValidator('image', IMAGE_MIMETYPE);

export const isAudio = generateMimetypeValidator('audio', AUDIO_MIMETYPE);

export const getFileType = ({ mimetype }: File): Nullable<UploadFile> => {
  switch (true) {
    case isImage(mimetype):
      return UploadFile.Image;
    case isAudio(mimetype):
      return UploadFile.Audio;
    default:
      return null;
  }
};
