'use client';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Box, Container, Grid, Typography } from '@mui/material';
import FormSentence from './FormSentence';
import SampleButton from './SamplesButton';
import { useState } from 'react';
import { SampleData, SampleTopicData } from '@/app/[locale]/demo/sentiment/SamplesType';
import jsonSampleData from './sample.json';

export default function Home() {
  const samples: SampleData = jsonSampleData;
  const [selectedSample, setSelectedSamples] = useState<SampleTopicData | null>(
    samples.topic['economic']
  );
  const handleSampleChange = (sample: SampleTopicData | null) => {
    // console.log("sample from page: ", sample);
    setSelectedSamples(sample);
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
              text: 'Sentiment Analysis',
            },
          ]}
        />
        <Typography variant="h3" sx={{ mt: 2 }}>
          Sentiment Analysis
        </Typography>
        <Grid container direction="row" spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: 'grey.50', borderRadius: 2, p: 3 }}>Overview</Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: 'grey.50', borderRadius: 2, p: 3 }}>
                  <SampleButton onSampleChange={handleSampleChange} samples={samples} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ backgroundColor: 'grey.50', borderRadius: 2, p: 3 }}>
              <FormSentence resetSample={handleSampleChange} sample={selectedSample} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
