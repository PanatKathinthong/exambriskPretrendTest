import { URL_BACKEND } from '@/config';
import axios from '../helper/interceptors';

type DemoRequest = { id: string };
type DemoResponse = { result: string };

export type ImageSearchValue = {
  class: string;
  score: number;
};

export type ImageSearchResponse = ImageSearchValue[];

export type SentimentRequest = { text: string[] };

export type SentimentResponse = {
  input: string;
  result: {
    label: string;
    score: number;
  }[];
}[];

export const getDemo = (param: DemoRequest) => {
  return axios.get<DemoResponse>(`${URL_BACKEND}/demo`);
};

type PredictiveMaintenanceRequest = {
  air_temperature: number;
  process_temperature_k: number;
  rotational_speed_rpm: number;
  torque: number;
  tool_wear: number;
  TWF: string;
  HDF: string;
  PWF: string;
  OSF: string;
  RNF: string;
  product_id: string;
  type: string;
};

export type PredictiveMaintenanceChartRespond = {
  Air_temperature_K_: number;
  Process_temperature_K_: number;
  Rotational_speed_rpm_: number;
  Torque_Nm_: number;
  Tool_wear_min_: number;
  TWF: number;
  PWF: number;
  HDF: number;
  OSF: number;
  RNF: number;
  encoded_Type: number;
};

export type PredictiveMaintenanceResponse = { probability_of_failure: number };

export const postPredictiveMaintenance = (param: PredictiveMaintenanceRequest) => {
  return axios.post<PredictiveMaintenanceResponse>(`${URL_BACKEND}/predictive-maintenance`, param);
};

export const getPredictiveMaintenance = () => {
  return axios.get<PredictiveMaintenanceChartRespond>(`${URL_BACKEND}/predictive-maintenance`);
};

export const postImageSearch = (param: FormData) => {
  return axios.post<ImageSearchResponse>(`${URL_BACKEND}/image-search`, param);
};

export const postSentiment = (param: SentimentRequest) => {
  return axios.post<SentimentResponse>(`${URL_BACKEND}/sentiment`, param);
};
