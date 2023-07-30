import { PieChart } from '@mui/x-charts';
import React from 'react';
function Chart () {
  return (
    <PieChart
      colors={['red', 'blue']}
      series={[
        {
          data: [
            { id: 0, value: 10, label: '生产中' },
            { id: 1, value: 15, label: '剩余' }
          ],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 3,
          cornerRadius: 6,
          startAngle: -90,
          cx: 150,
          cy: 150
        }
      ]}
      width={400}
      height={300}

    />
  );
}
export default Chart;
