import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import { isAudio, isImage } from './mime-type.util';

export type File = Express.Multer.File;

export type TypeOrError<T = any> = T | never;

export type MimetypeValidatorFunction = typeof isImage | typeof isAudio;

export type CloudApiResponse = UploadApiErrorResponse | UploadApiResponse;

export enum UploadFile {
  Image = 'image',
  Audio = 'audio'
}

export type FilesStrategy = {
  [k in UploadFile]: { size: number };
};

export type ApiResponse = { files: string[] };

export type Maybe<T> = T | undefined;

export type Nullable<T> = T | null;
