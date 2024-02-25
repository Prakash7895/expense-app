import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import { FC, useEffect } from 'react';
import { getSettings } from '../utils/store/settingSlice';
import { useAppSelector } from '../utils/types';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  SVGRenderer,
  LabelLayout,
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

interface IDonutChart {
  id: string;
  data: { value: number; name: string }[];
  className: string;
  centerLabel?: string;
}

const DonutChart: FC<IDonutChart> = ({ id, data, className, centerLabel }) => {
  const { mode } = useAppSelector(getSettings);

  useEffect(() => {
    const chartDom = document.getElementById(`donut-chart-${id}`)!;
    const myChart = echarts.init(chartDom);
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Transactions',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor:
              mode === 'dark'
                ? '#fff'
                : 'hsl(var(--expense-tracker-default-200)',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            color: mode === 'dark' ? '#fff' : '#000',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
          },
          data: data,
        },
      ],
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [mode, data]);

  return (
    <div className={`${className} relative`}>
      <p className='absolute top-[calc(50%-12px)] left-[calc(50%-64px)] w-32 text-center'>
        {centerLabel}
      </p>
      <div className='h-full w-full' id={`donut-chart-${id}`}></div>
    </div>
  );
};

export default DonutChart;
