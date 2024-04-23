'use client';
import PredictiveForm from './PredictiveForm';
import SampleComponent from './SampleComponent';
import { Box } from '@mui/material';
import { useState } from 'react';
import { FormValues } from './FormsType';
import PredictiveChart from './PredictiveChart';

export default function Home() {
  const probDataArray = [
    {
      productID: 'L50096',
      toolWear: 0,
      torque: 0,
      productQuality: 'L',
      powerFailure: '1',
      overStrainFailure: '0',
      heatDissipationFailure: '0',
      toolWearFailure: '0',
      randomFailure: '1',
      rotationalSpeed: 0,
      airTemperature: 0,
      processTemperature: 0,
      percent: 11.02,
    },
    {
      productID: 'M50780',
      toolWear: 0,
      torque: 0,
      productQuality: 'L',
      powerFailure: '0',
      overStrainFailure: '0',
      heatDissipationFailure: '1',
      toolWearFailure: '0',
      randomFailure: '1',
      rotationalSpeed: 1,
      airTemperature: 0,
      processTemperature: 0,
      percent: 33.45,
    },
  ];

  const [dataSelect, setDataSelect] = useState<FormValues>(probDataArray[0]);
  return (
    <div>
      <PredictiveChart />
      <PredictiveForm defaultValue={dataSelect} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          paddingX: '10px',
          width: '100%',
          marginTop: '10px',
        }}
      >
        {probDataArray.map((probData, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SampleComponent
              title={`${probData.percent}% Failure`}
              formvalue={probData}
              setDataSelect={setDataSelect}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
}
