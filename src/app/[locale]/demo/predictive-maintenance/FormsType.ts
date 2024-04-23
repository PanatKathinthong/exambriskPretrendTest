import { z } from 'zod';

export const formSchema = z.object({
  productID: z.string(),
  productQuality: z.string(),
  powerFailure: z.string(),
  overStrainFailure: z.string(),
  heatDissipationFailure: z.string(),
  toolWearFailure: z.string(),
  randomFailure: z.string(),
  toolWear: z.number().max(106).min(64),
  torque: z.number().max(39).min(9),
  rotationalSpeed: z.number().max(1493).min(139),
  airTemperature: z.number().max(300).min(2),
  processTemperature: z.number().max(310).min(2),
  percent: z.number(),
});

export type FormValues = z.infer<typeof formSchema>;
