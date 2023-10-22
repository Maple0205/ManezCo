import React from 'react';
import { Line } from '@ant-design/charts';

const Trend = () => {
  const data = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
  ];
  const config = {
    data,
    padding: 'auto',
    forceFit: true,
    xField: 'year',
    yField: 'value',
    tooltip: {
      custom: {
        customContent: (title, items) => {
          return (
            <div
              style={{
                padding: '16px 8px',
              }}
            >
              <h5>提示</h5>
              <p>年份：{title}</p>
              <p
                style={{
                  margin: 0,
                }}
              >
                值：{items[0] && items[0].data.value}
              </p>
            </div>
          );
        },
      },
    },
    point: {
      visible: true,
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#2593fc',
        lineWidth: 2,
      },
    },
  };
  return <Line {...config} />;
};

export default Trend;
