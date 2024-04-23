import ImageNext, { ImageProps } from 'next/image';

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);
const shimmer = () =>
  `<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><radialGradient id="a" cx="50%" cy="46.801102%" r="95.497112%"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#919eab" stop-opacity=".48"/></radialGradient><path d="m88 86h512v512h-512z" fill="url(#a)" fill-rule="evenodd" transform="translate(-88 -86)"/></svg>`;

  const Image = (props: ImageProps) => {
  return (
    <ImageNext
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer())}`}
      {...props}
    />
  );
};

export default Image