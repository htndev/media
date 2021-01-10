import convert from 'convert-size';

export const convertBytesToMb = (bytes: number, { round = false }: { round?: boolean } = {}): string =>
  convert(bytes, { accuracy: round ? 0 : 2 });
