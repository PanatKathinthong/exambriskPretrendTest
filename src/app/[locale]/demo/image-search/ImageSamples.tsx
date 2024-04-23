import { ImageSearchResponse } from '@/services/demo';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface ImageSamplesProps {
  //   imageUrl: string;
  onClick: (image: string, result: ImageSearchResponse | null) => void;
}

const tempImage = [
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/88/Commander_Eileen_Collins_-_GPN-2000-001177.jpg',
  },
  {
    imageUrl:
      'https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg.webp',
  },
];

const ImageSamples: React.FC<ImageSamplesProps> = ({ onClick }) => {
  const handleClick = (imageUrl: string) => {
    onClick(imageUrl, null);
  };
  return (
    <>
      <Typography variant="h6" marginBottom="12px">
        Samples for Test
      </Typography>
      {tempImage.map((imageUrl, index) => (
        <Box
          key={index}
          component="img"
          src={imageUrl.imageUrl}
          onClick={() => handleClick(imageUrl.imageUrl)}
          sx={{
            width: 45.6,
            height: 45.6,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
            objectFit: 'cover',
            borderRadius: '8px',
            marginRight: '8px',
          }}
        />
      ))}
    </>
  );
};

export default ImageSamples;
