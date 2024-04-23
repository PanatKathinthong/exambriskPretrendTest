'use client';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Box, Container, Grid, Typography } from '@mui/material';
import UploadImage from './UploadImage';
import ImageResult from './ImageResult';
import ImageSamples from './ImageSamples';
import { useState } from 'react';
import { ImageSearchResponse } from '@/services/demo';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<ImageSearchResponse | null>(null);
  const handleImage = (image: string | null, result: ImageSearchResponse | null) => {
    setImage(image);
    setResult(result);
  };

  return (
    <main>
      <Container sx={{ mt: 4 }}>
        <Breadcrumbs
          items={[
            {
              text: 'Main Page',
              href: '/',
            },
            {
              text: 'Image Search',
            },
          ]}
        />
        <Typography variant="h3" sx={{ mt: 2 }}>
          Image Search
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: 'grey.50', borderRadius: 2, p: 3 }}>Overview</Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: 'grey.50', borderRadius: 2, p: 3 }}>
                  <ImageSamples onClick={handleImage} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: 'grey.50',
                    borderRadius: 2,
                    p: 3,
                  }}
                >
                  <UploadImage onImageUpload={handleImage} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            {/* <Box
              sx={{ backgroundColor: "grey.50", borderRadius: 2, p: 3 }}
            ></Box> */}
            <ImageResult image={image} result={result} />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
