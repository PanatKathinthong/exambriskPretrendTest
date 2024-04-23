'use client';

import useAuth from '@/auth/useAuth';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Button, Box, TextField, MenuItem, Select, Stack } from '@mui/material';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from './FormsType';
import React from 'react';
import SectionComponent from './SectionComponent';
import { postPredictiveMaintenance, PredictiveMaintenanceResponse } from '@/services/demo';

const ITEM_PRIORITY_LEVEL = [
  { label: 'Low', value: 'L' },
  { label: 'Medium', value: 'M' },
  { label: 'High', value: 'H' },
];

const ITEM_FAILURE_LEVEL = [
  { label: 'Not Fail', value: '1', disabled: false },
  { label: 'Fail', value: '0', disabled: false },
];

const FormSentence = ({ defaultValue }: { defaultValue: FormValues }) => {
  const [isDirtyLocal, setIsDirtyLocal] = useState(false);

  const { isAuthenticated, redirectToLogin } = useAuth();
  const [response, setResponse] = useState<PredictiveMaintenanceResponse>({
    probability_of_failure: defaultValue.percent,
  });
  const [drawing, saveDrawing] = useLocalStorage<FormValues | null>('predictive-form', undefined);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty: isDirtyForm },
    control,
    setValue,
  } = methods;
  const isDirty = isDirtyForm || isDirtyLocal;
  const clearData = () => {
    reset({
      productID: 'L75475',
      productQuality: 'none',
      powerFailure: 'none',
      overStrainFailure: 'none',
      heatDissipationFailure: 'none',
      toolWearFailure: 'none',
      randomFailure: 'none',
      toolWear: 0,
      torque: 0,
      rotationalSpeed: 0,
      airTemperature: 0,
      processTemperature: 0,
    });
    setIsDirtyLocal(true);
    setResponse((prevResponse) => ({
      ...prevResponse,
      probability_of_failure: 0,
    })); //reset percent to zero when clear all
    //console.log("Clear Data");
  };
  const onSubmit = async (data: FormValues) => {
    if (!isAuthenticated) {
      saveDrawing(data);
      redirectToLogin();
    } else {
      console.log(isDirty);
      if (isDirty) {
        try {
          const response = await postPredictiveMaintenance({
            air_temperature: data.airTemperature,
            process_temperature_k: data.processTemperature,
            rotational_speed_rpm: data.rotationalSpeed,
            torque: data.torque,
            tool_wear: data.toolWear,
            TWF: data.toolWearFailure,
            HDF: data.heatDissipationFailure,
            PWF: data.powerFailure,
            OSF: data.overStrainFailure,
            RNF: data.randomFailure,
            product_id: data.productID,
            type: data.productQuality,
          });
          console.log('Percent:', response.data.probability_of_failure);
          setResponse(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        return;
      }
    }

    //console.log("Submit!");
    //console.log(data);
  };

  useEffect(() => {
    setIsDirtyLocal(false);
    reset(defaultValue);
    setResponse((prevResponse) => ({
      ...prevResponse,
      probability_of_failure: defaultValue.percent,
    }));
    //console.log(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (drawing) {
      setIsDirtyLocal(true);
      reset(drawing, {
        keepDirty: true,
      });
    }
    saveDrawing(null);
  }, []);

  const RenderMenuItemPriority = ITEM_PRIORITY_LEVEL.map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.label}
    </MenuItem>
  ));

  const RenderMenuItemFailure = ITEM_FAILURE_LEVEL.map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.label}
    </MenuItem>
  ));

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" spacing={35} sx={{ width: '100%', backgroundColor: '#E0E0E0' }}>
            <div>Parameter Name</div>
            <div>Min Value</div>
            <div>Max Value</div>
            <div>Input Value</div>
            <div>Unit Value</div>
          </Stack>
          <SectionComponent
            sectionID="Product ID"
            minCondition="-"
            maxCondition="-"
            unit="-"
            component={
              <RHFTextField
                name="productID"
                sx={{
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  width: '80%',
                  color: '#707070',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                }}
              />
            }
          />
          <SectionComponent
            sectionID="Product quality type"
            minCondition="-"
            maxCondition="-"
            unit="-"
            component={
              <Controller
                name="productQuality"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="none" disabled>
                      Please Select
                    </MenuItem>
                    {RenderMenuItemPriority}
                  </Select>
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Power failure"
            minCondition="-"
            maxCondition="-"
            unit="-"
            component={
              <Controller
                name="powerFailure"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="none" disabled>
                      Please Select
                    </MenuItem>
                    {RenderMenuItemFailure}
                  </Select>
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Overstrain failure"
            minCondition="-"
            maxCondition="-"
            unit="-"
            component={
              <Controller
                name="overStrainFailure"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="none" disabled>
                      Please Select
                    </MenuItem>
                    {RenderMenuItemFailure}
                  </Select>
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Heat Dissipation failure"
            minCondition="-"
            maxCondition="-"
            unit="-"
            component={
              <Controller
                name="heatDissipationFailure"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="none" disabled>
                      Please Select
                    </MenuItem>
                    {RenderMenuItemFailure}
                  </Select>
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Tool wear failure"
            minCondition="-"
            maxCondition="-"
            unit="-"
            component={
              <Controller
                name="toolWearFailure"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="none" disabled>
                      Please Select
                    </MenuItem>
                    {RenderMenuItemFailure}
                  </Select>
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Random failure"
            minCondition="-"
            maxCondition="-"
            unit="-"
            component={
              <Controller
                name="randomFailure"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="none" disabled>
                      Please Select
                    </MenuItem>
                    {RenderMenuItemFailure}
                  </Select>
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Tool wear"
            minCondition="64"
            maxCondition="106"
            unit="Min"
            component={
              <Controller
                control={control}
                name="toolWear"
                render={({ field: { onChange, value } }) => (
                  <NumericFormat
                    value={value}
                    onValueChange={({ floatValue }) => {
                      if (floatValue !== undefined) {
                        onChange(floatValue);
                      } else {
                        onChange('');
                      }
                    }}
                    customInput={TextField}
                    sx={{
                      border: errors.toolWear ? '1px solid red' : '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  />
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Torque"
            minCondition="9"
            maxCondition="39"
            unit="Newton Meter"
            component={
              <Controller
                control={control}
                name="torque"
                render={({ field: { onChange, value } }) => (
                  <NumericFormat
                    value={value}
                    onValueChange={({ floatValue }) => {
                      if (floatValue !== undefined) {
                        onChange(floatValue);
                      } else {
                        onChange('');
                      }
                    }}
                    customInput={TextField}
                    sx={{
                      border: errors.torque ? '1px solid red' : '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  />
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Rotational speed"
            minCondition="139"
            maxCondition="1493"
            unit="Rotations Per Minute"
            component={
              <Controller
                control={control}
                name="rotationalSpeed"
                render={({ field: { onChange, value } }) => (
                  <NumericFormat
                    value={value}
                    onValueChange={({ floatValue }) => {
                      if (floatValue !== undefined) {
                        onChange(floatValue);
                      } else {
                        onChange('');
                      }
                    }}
                    customInput={TextField}
                    sx={{
                      border: errors.rotationalSpeed ? '1px solid red' : '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  />
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Air temperature"
            minCondition="2"
            maxCondition="300"
            unit="Kelvin"
            component={
              <Controller
                control={control}
                name="airTemperature"
                render={({ field: { onChange, value } }) => (
                  <NumericFormat
                    value={value}
                    onValueChange={({ floatValue }) => {
                      if (floatValue !== undefined) {
                        onChange(floatValue);
                      } else {
                        onChange('');
                      }
                    }}
                    customInput={TextField}
                    sx={{
                      border: errors.airTemperature ? '1px solid red' : '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  />
                )}
              />
            }
          />
          <SectionComponent
            sectionID="Process temperature"
            minCondition="2"
            maxCondition="310"
            unit="Kelvin"
            component={
              <Controller
                control={control}
                name="processTemperature"
                render={({ field: { onChange, value } }) => (
                  <NumericFormat
                    value={value}
                    onValueChange={({ floatValue }) => {
                      if (floatValue !== undefined) {
                        onChange(floatValue);
                      } else {
                        onChange('');
                      }
                    }}
                    customInput={TextField}
                    sx={{
                      border: errors.processTemperature ? '1px solid red' : '1px solid #ced4da',
                      borderRadius: '4px',
                      width: '80%',
                      color: '#707070',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  />
                )}
              />
            }
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginTop: '20px',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              variant="contained"
              sx={{ display: 'flex', marginRight: '25px' }}
              onClick={clearData}
            >
              Clear all
            </Button>
            <Button variant="contained" type="submit" disabled={!isDirty}>
              Test
            </Button>
          </Box>
          <Box sx={{ display: 'flex', color: '#003B92', fontWeight: '500', fontSize: '20px' }}>
            Prediction Result: {response.probability_of_failure.toFixed(2)}% of failure
          </Box>
        </Box>
      </FormProvider>
    </>
  );
};

export default FormSentence;
