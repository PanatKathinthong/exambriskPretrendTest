export type SampleTopicData = {
  sentence: string;
  result: string;
}[];

export type SampleData = {
  topic: {
    [topic_name: string]: SampleTopicData;
  };
};
