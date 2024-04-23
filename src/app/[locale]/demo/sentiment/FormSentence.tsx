'use client';

import useAuth from '@/auth/useAuth';
import { FormProvider, RHFTextField } from '@/components/hook-form';
import { Button, Chip, Grid, Typography } from '@mui/material';
import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import { SampleTopicData } from '@/app/[locale]/demo/sentiment/SamplesType';
import { postSentiment } from '@/services/demo';

interface FormSentenceProps {
  resetSample: (sample: null) => void;
  sample: SampleTopicData | null;
}

type FormValues = {
  sentences: SampleTopicData;
};

const FormSchema: ZodType<FormValues> = z.object({
  sentences: z.array(
    z.object({
      // cannot use min for empty string because required_error property in Zod triggers only if the field is not registered. not when it's an empty string
      // using superRefine to validate sentence length
      sentence: z.string().superRefine((val, ctx) => {
        if (val.length < 1)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '*Please input sentence before test.',
          });
        if (val.length < 25 || val.length > 200)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '*The sentence should have characters between 25-200 characters.',
          });
      }),
      result: z.string(),
    })
  ),
});

const FormSentence: React.FC<FormSentenceProps> = ({ resetSample, sample }) => {

  const { isAuthenticated, redirectToLogin } = useAuth();
  // save drawing before login and restore after login
  const [drawing, saveDrawing] = useLocalStorage<FormValues | null>('sentences', null);
  // for re-renderng the prediction results
  const methods = useForm<FormValues>({
    defaultValues: {
      sentences: [
        {
          sentence: '',
          result: '',
        },
      ],
    },
    resolver: zodResolver(FormSchema),
  });
  const {
    getValues,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isDirty },
  } = methods;

  // dynamic react hook form
  const { fields, append } = useFieldArray({
    name: 'sentences',
    control,
  });

  const onSubmit = async (formData: FormValues) => {
    console.log('submitting');
    if (!isAuthenticated) {
      saveDrawing(formData);
      redirectToLogin();
    }

    try {
      const input = formData.sentences.map((sentence) => sentence.sentence);
      const { data } = await postSentiment({ text: input });
      data.map((result, index) => {
        formData.sentences[index].result = result.result[0].label;
      });
    } catch (error) {
      console.log(error);
    }

    reset(formData, { keepDirty: true });
  };

  const handleClear = () => {
    // reset sample useState
    resetSample(null);

    setValue(
      'sentences',
      [
        {
          sentence: '',
          result: '',
        },
        {
          sentence: '',
          result: '',
        },
      ],
      { shouldDirty: true }
    );
  };

  const chipColor = (result: string) => {
    switch (result) {
      case 'pos':
        return 'primary';
      case 'neg':
        return 'error';
      case 'neu':
        return 'info';
      default:
        return 'default';
    }
  };
  const chipLabel = (pos: string) => {
    switch (pos) {
      case 'pos':
        return 'Positive';
      case 'neg':
        return 'Negative';
      case 'neu':
        return 'Neutral';
      default:
        return '';
    }
  };
  useEffect(() => {
    if (sample) {
      if (drawing) {
        reset(drawing);
      } else {
        reset({
          sentences: sample
        });
      }
    }
    // saveDrawing(sentenceSamples);
    saveDrawing(null);
  }, [sample]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={2} />
        <Grid item xs={7}>
          <Typography variant="h6">Input Sentence</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Prediction Result</Typography>
        </Grid>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <Grid item xs={2}>
              {`Sentence ${index + 1}:`}
            </Grid>
            <Grid item xs={7}>
              {/* <TextField
                variant="outlined"
                size="small"
                multiline
                fullWidth
                {...register(`sentences.${index}.sentence`)}
              /> */}
              <RHFTextField
                name={`sentences.${index}.sentence`}
                placeholder="Please input sentence..."
                rows={3}
                multiline
                size="small"
                fullWidth
                inputProps={{ maxLength: 200 }}
                // control={control}
                // {...register(`sentences.${index}.sentence`)}
              />
            </Grid>
            <Grid item xs={3}>
              {getValues(`sentences.${index}.result`) && (
                <Chip
                  label={chipLabel(getValues(`sentences.${index}.result`))}
                  color={chipColor(getValues(`sentences.${index}.result`))}
                  sx={{
                    padding: '4px',
                  }}
                />
              )}
            </Grid>
          </React.Fragment>
        ))}

        {fields.length < 5 && (
          <>
            <Grid item xs={2} />
            <Grid item xs={10}>
              <Button
                onClick={() => {
                  append({ sentence: '', result: '' });
                  console.log(getValues('sentences'));
                }}
                variant="outlined"
                color="primary"
                startIcon={<AddIcon fontSize="small" />}
              >
                add sentence
              </Button>
            </Grid>
          </>
        )}
        <Grid item xs={2} sx={{ mt: 2 }} />

        <Grid item xs={10} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={handleClear}>
            Clear All
          </Button>
          <Button
            variant="contained"
            disabled={!isDirty}
            type="submit"
            style={{ marginLeft: '15px' }}
          >
            Test
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default FormSentence;
