'use client';

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { getPredictiveMaintenance, PredictiveMaintenanceChartRespond } from '@/services/demo';

const PredictiveChart = () => {
  const [chartRespond, setChartResponse] = useState<PredictiveMaintenanceChartRespond>();

  const loadChartData = async () => {
    try {
      const response = await getPredictiveMaintenance();
      setChartResponse(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    loadChartData();
  }, []);

  const mapKeyByName = (key: String) => {
    if (key == 'Air_temperature_K_') {
      return 'Air Temperature';
    } else if (key == 'Process_temperature_K_') {
      return 'Process Temperature';
    } else if (key == 'Rotational_speed_rpm_') {
      return 'Ratational Speed';
    } else if (key == 'Torque_Nm_') {
      return 'Torque';
    } else if (key == 'Tool_wear_min_') {
      return 'Tool wear';
    } else if (key == 'TWF') {
      return 'Tool wear failures';
    } else if (key == 'PWF') {
      return 'Power failures';
    } else if (key == 'OSF') {
      return 'Overstrain failures';
    } else if (key == 'RNF') {
      return 'Random failures';
    } else if (key == 'HDF') {
      return 'Heat dissipation failures';
    }

    return '';
  };

  const filterChartDataWithStyle = (data: PredictiveMaintenanceChartRespond) => {
    const colorArray = [
      '#000C1D',
      '#00183A',
      '#002358',
      '#002F75',
      '#003B92',
      '#0047AF',
      '#005EE7',
      '#207AFF',
      '#589BFF',
      '#8FBDFF',
      '#C7DEFF',
    ];

    const sortedData = Object.entries(data).sort(([, valueA], [, valueB]) => valueB - valueA);

    return sortedData.map(([key, value], index) => ({
      name: mapKeyByName(key) + ' ' + value + '%',
      value,
      label: value >= 5 ? {} : { show: false },
      labelLine: value >= 5 ? {} : { show: false },
      itemStyle: {
        color: colorArray[index % colorArray.length],
      },
    }));
  };

  return (
    <>
      {chartRespond && (
        <ReactEcharts
          option={{
            tooltip: {
              trigger: 'item',
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                startAngle: 360,
                data: filterChartDataWithStyle(chartRespond),
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
                },
              },
            ],
          }}
          style={{ height: '400px', width: '50%' }}
        />
      )}
    </>
  );
};

export default PredictiveChart;
