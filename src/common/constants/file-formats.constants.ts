export enum ImageFormat {
  JPG = 'jpg',
  JPEG = 'jpeg',
  PNG = 'png',
  BMP = 'bmp'
}

export enum ImageMimetype {
  JPEG = 'jpeg',
  PNG = 'png',
  BMP = 'bmp'
}

export enum AudioFormat {
  MP3 = 'mp3',
  OGG = 'ogg'
}

export enum AudioMimetype {
  MP3 = 'mpeg',
  OGG = 'ogg'
}

export const IMAGE_FORMATS: ImageFormat[] = [ImageFormat.JPG, ImageFormat.JPEG, ImageFormat.PNG, ImageFormat.BMP];
export const IMAGE_MIMETYPE: ImageMimetype[] = [ImageMimetype.BMP, ImageMimetype.JPEG, ImageMimetype.PNG];

export const AUDIO_FORMATS: AudioFormat[] = [AudioFormat.MP3, AudioFormat.OGG];
export const AUDIO_MIMETYPE: AudioMimetype[] = [AudioMimetype.MP3, AudioMimetype.OGG];
