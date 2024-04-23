import { Chip, Grid, Typography } from '@mui/material';
import { SampleData, SampleTopicData } from '@/app/[locale]/demo/sentiment/SamplesType';

interface SamplesButtonProps {
  onSampleChange: (sample: SampleTopicData) => void;
  samples: SampleData;
}

// const samples: SamplesData = sample;
const SampleButtons: React.FC<SamplesButtonProps> = ({ onSampleChange, samples }) => {
  const handleChangeSample = (sample: SampleTopicData) => {
    onSampleChange(sample);
  };

  return (
    <>
      <Typography variant="h6">Samples for Test</Typography>
      <Grid container spacing={2}>
        {Object.keys(samples.topic).map((topic_name, index) => (
          <Grid item key={index}>
            <Chip
              label={topic_name.replace(/_/g, ' ')}
              onClick={() => handleChangeSample(samples.topic[topic_name])}
              sx={{ textTransform: 'capitalize', textDecoration: 'none' }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SampleButtons;
