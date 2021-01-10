import { UploadFile } from '../utils/types.util';

export const folders: { [k in UploadFile | 'other']: string } = {
  image: 'images',
  audio: 'audios',
  other: 'other'
};
