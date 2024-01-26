
import styled from 'styled-components';
import Heading from '../../ui/Heading';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';


const ChartBox = styled.div`
 background-color:var(--color-grey-0);
 border:1px solid var(--color-grey-100);
 border-radius: var(--border-radius-md);
  padding: 2.4rem 3rem;

  grid-column: 3 / span 2;

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  /* A bit hack, but okay */
  & > *:first-child {
    margin-bottom: 1rem;
  }
`;
/*
const startDataLight = {
  '1 nights': {
    duration: '1 nights',
    value: 0,
    color: '#ef4444',
  },
  '2 nights': {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  '3 nights': {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  '4-5 nights': {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  '6-7 nights': {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  '8-14 nights': {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  '15-21 nights': {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  '21+ nights': {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
};

const startDataDark = {
  '1 nights': {
    duration: '1 nights',
    value: 0,
    color: '#b91c1c',
  },
  '2 nights': {
    duration: '2 nights',
    value: 0,
    color: '#c2410c',
  },
  '3 nights': {
    duration: '3 nights',
    value: 0,
    color: '#a16207',
  },
  '4-5 nights': {
    duration: '4-5 nights',
    value: 0,
    color: '#4d7c0f',
  },
  '6-7 nights': {
    duration: '6-7 nights',
    value: 0,
    color: '#15803d',
  },
  '8-14 nights': {
    duration: '8-14 nights',
    value: 0,
    color: '#0f766e',
  },
  '15-21 nights': {
    duration: '15-21 nights',
    value: 0,
    color: '#1d4ed8',
  },
  '21+ nights': {
    duration: '21+ nights',
    value: 0,
    color: '#7e22ce',
  },
};
*/

const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
];

const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    color: '#b91c1c',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#c2410c',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#a16207',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#4d7c0f',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#15803d',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#0f766e',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#1d4ed8',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#7e22ce',
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
  }

  function DurationChart({confirmedStays}){
    const{isdarkMode} = useDarkMode()
    const startData = isdarkMode ? startDataDark : startDataLight
    const data = prepareData(startData , confirmedStays)
    return( 
    <ChartBox>
    <Heading as='h2'>Stay duration summary</Heading>
    <ResponsiveContainer width='100%' height={250}>
      <PieChart>
        <Pie data={data} 
        nameKey='duration' dataKey='value' 
        innerRadius={70} outerradius={110}
        cx='45%'
        cy='50%'
        paddingAngle={2}>
          {data.map((entry) =><Cell fill={entry.color} stroke={entry.color} key={entry.duration}/>)}
        </Pie>
        <Tooltip />
        <Legend verticalAlign='middle' 
        align='right'
        width='30%'
        layout='vertical'
        iconSize={15}
        iconType='circle' />
      </PieChart>
    </ResponsiveContainer>
    </ChartBox>
    )
  }
  export default DurationChart;






  /*
  const tempData = stays.reduce((obj, cur) => {
    const num = cur.numNights;
    console.log(num, obj);
    // For 1, 2, or 3 nights, we have single category
    if (num <= 3) {
      obj[`${num} nights`] = {
        ...obj[`${num} nights`],
        value: obj[`${num} nights`].value + 1,
      };
      return obj;
    }
    if (num === 4 || num === 5) {
      console.log(obj['4-5 nights']);
      console.log(obj['4-5 nights'].value + 1);

      obj['4-5 nights'] = {
        ...obj['4-5 nights'],
        value: obj['4-5 nights'].value + 1,
      };
      return obj;
    }
    if (num === 6 || num === 7) {
      obj['6-7 nights'] = {
        ...obj['6-7 nights'],
        value: obj['6-7 nights'].value + 1,
      };
      return obj;
    }
    if (num >= 8 && num <= 14) {
      obj['8-14 nights'] = {
        ...obj['8-14 nights'],
        value: obj['8-14 nights'].value + 1,
      };
      return obj;
    }
    if (num >= 15 && num <= 21) {
      obj['15-21 nights'] = {
        ...obj['15-21 nights'],
        value: obj['15-21 nights'].value + 1,
      };
      return obj;
    }
    if (num >= 21) {
      obj['21+ nights'] = {
        ...obj['21+ nights'],
        value: obj['21+ nights'].value + 1,
      };
      return obj;
    }

    return obj;
  }, startData);

  return Object.values(tempData).filter((obj) => obj.value > 0);
  */


