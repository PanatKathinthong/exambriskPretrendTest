'use client';
import React from 'react';
import { Box, Button } from '@mui/material';
import { FormValues } from './FormsType';

const SampleComponent: React.FC<{ title: string; formvalue: FormValues; setDataSelect: any }> = ({
  title,
  formvalue,
  setDataSelect,
}) => {
  const handleClick = () => {
    //console.log(prob);
    setDataSelect(formvalue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingX: '10px',
        backgroundColor: 'gray',
        color: 'black',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
    >
      <Button onClick={handleClick} style={{ cursor: 'pointer' }}>
        {title}
      </Button>
    </Box>
  );
};

export default SampleComponent;
