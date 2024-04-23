import { Box, Grid, Typography } from '@mui/material';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import { BarChart } from '@mui/x-charts/BarChart';
import { ImageSearchResponse } from '@/services/demo';

interface ImageResultProps {
  image: string | null;
  result: ImageSearchResponse | null;
}

const ImageResult: React.FC<ImageResultProps> = ({ image, result }) => {
  return (
    <Grid container>
      <Grid item xs={6.8}>
        {image ? (
          <Box
            component="img"
            src={image}
            sx={{ height: 474, width: 474, objectFit: 'cover', borderRadius: '8px' }}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 474,
              width: 474,
              backgroundColor: '#EAEAEA', // Grey background color
              borderRadius: '8px',
            }}
          >
            <PhotoOutlinedIcon sx={{ width: 64, height: 64 }} />
          </Box>
        )}
      </Grid>
      <Grid item xs={5.2}>
        <Box
          sx={{
            backgroundColor: 'grey.50',
            borderRadius: 2,
            p: 3,
            height: 388,
            width: '100%',
          }}
        >
          <Typography variant="h6">Result</Typography>
          {result && (
            <BarChart
              dataset={result}
              yAxis={[{ scaleType: 'band', dataKey: 'class' }]}
              series={[{ dataKey: 'score' }]}
              layout="horizontal"
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ImageResult;
