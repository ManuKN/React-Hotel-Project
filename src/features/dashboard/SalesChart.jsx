import styled from 'styled-components';
import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/DarkModeContext';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({bookings , numDays}){

  const{isdarkMode} = useDarkMode();

//vedio 402 full explanation
  const allDates = eachDayOfInterval({
    start:subDays(new Date() , numDays - 1),
    end:new Date(),
  });

  //to make the data as a array of key value pairs for each bookings like format of OLDdata(dammy data)
  const data = allDates.map((date) =>{
    return{
      label:format(date , "MMM dd"),
      totalSales:bookings?.filter((bookings) =>isSameDay(date ,new Date(bookings.created_at)))
      .reduce((acc , cur) =>acc+cur.totalPrice ,0),

      extraSales:bookings?.filter((bookings) =>isSameDay(date ,new Date(bookings.created_at)))
      .reduce((acc , cur) =>acc+cur.extraPrice ,0),
    }
  })


  const colors = isdarkMode
      ? {
          totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
          extraSales: { stroke: '#22c55e', fill: '#22c55e' },
          text: '#e5e7eb',
          background: '#18212f',
        }
      : {
          totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
          extraSales: { stroke: '#16a34a', fill: '#dcfce7' },
          text: '#374151',
          background: '#fff',
        };
  

  return(
    <StyledSalesChart>
      <Heading as='h2'>Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash; {format(allDates.at(-1) ,'MMM dd yyyy')}</Heading>
        <ResponsiveContainer height={300} width='100%'>
      <AreaChart data={data} >
      <XAxis dataKey='label' tick={{fill:colors.text}} tickLine={{stroke:colors.text}}/>
      <YAxis unit='$' tick={{fill:colors.text}} tickLine={{stroke:colors.text}}/>
      <CartesianGrid strokeDasharray='4'/>
      <Tooltip contentStyle={{backgroundColor:colors.background}}/>
      <Area dataKey='totalSales' type='monotone' stroke={colors.totalSales.stroke} fill={colors.totalSales.fill} 
      strokeWidth={2}
      name='Total sales'
      unit='$'/>
      <Area dataKey='extraSales' type='monotone' stroke={colors.extraSales.stroke} fill={colors.extraSales.fill} 
      strokeWidth={2}
      name='Extra sales'
      unit='$'/>
      </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}
export default SalesChart;

// const OLDdata = [
//   { label: 'Jan 09', totalSales: 480, extraSales: 320 - 300 },
//   { label: 'Jan 10', totalSales: 580, extraSales: 400 - 300 },
//   { label: 'Jan 11', totalSales: 550, extraSales: 450 - 300 },
//   { label: 'Jan 12', totalSales: 600, extraSales: 350 - 300 },
//   { label: 'Jan 13', totalSales: 700, extraSales: 550 - 300 },
//   { label: 'Jan 14', totalSales: 800, extraSales: 650 - 500 },
//   { label: 'Jan 15', totalSales: 700, extraSales: 700 - 500 },
//   { label: 'Jan 16', totalSales: 650, extraSales: 500 - 300 },
//   { label: 'Jan 17', totalSales: 600, extraSales: 600 - 300 },
//   { label: 'Jan 18', totalSales: 550, extraSales: 400 - 300 },
//   { label: 'Jan 19', totalSales: 700, extraSales: 600 - 500 },
//   { label: 'Jan 20', totalSales: 800, extraSales: 700 - 500 },
//   { label: 'Jan 21', totalSales: 700, extraSales: 600 - 500 },
//   { label: 'Jan 22', totalSales: 810, extraSales: 550 - 500 },
//   { label: 'Jan 23', totalSales: 950, extraSales: 750 - 500 },
//   { label: 'Jan 24', totalSales: 970, extraSales: 600 - 500 },
//   { label: 'Jan 25', totalSales: 900, extraSales: 700 - 500 },
//   { label: 'Jan 26', totalSales: 950, extraSales: 800 - 500 },
//   { label: 'Jan 27', totalSales: 850, extraSales: 700 - 500 },
//   { label: 'Jan 28', totalSales: 900, extraSales: 600 - 500 },
//   { label: 'Jan 29', totalSales: 800, extraSales: 800 - 500 },
//   { label: 'Jan 30', totalSales: 950, extraSales: 700 - 500 },
//   { label: 'Jan 31', totalSales: 1100, extraSales: 800 - 500 },
//   { label: 'Feb 01', totalSales: 1200, extraSales: 900 - 500 },
//   { label: 'Feb 02', totalSales: 1250, extraSales: 800 - 500 },
//   { label: 'Feb 03', totalSales: 1400, extraSales: 950 - 500 },
//   { label: 'Feb 04', totalSales: 1500, extraSales: 1000 - 500 },
//   { label: 'Feb 05', totalSales: 1400, extraSales: 1100 - 500 },
//   { label: 'Feb 06', totalSales: 1450, extraSales: 900 - 500 },
// ];

