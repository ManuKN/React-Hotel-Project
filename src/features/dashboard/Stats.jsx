
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from 'react-icons/hi2';
import Stat from '../dashboard/Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays , numDays , cabinCount}) {
  // Stat 1)
  const numBookings = bookings?.length

  // Stat 2)
  const sales = bookings?.reduce((acc , cur) => acc+cur.totalPrice , 0)
  // Stat 3)
 const checkins = confirmedStays.length
  // Stat 4)
  // We will use a trick to calculate occupancy rate. It's not 100% accurate, but we want to keep it simple. We know we can have a total of 'numDays * cabinCount' days to occupy, and we also know how many days were actually booked. From this, we can compute the percentage
 const occupation = confirmedStays.reduce((acc , cur) => acc + cur.numNights , 0)/(numDays*cabinCount)

  return (
   <>
   <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
   <Stat  title='Sales' color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)}/>
   <Stat title='Check-ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkins}/>
   <Stat title='Occupancy rate' color='yellow' icon={<HiOutlineChartBar />} value={Math.round(occupation*100)+'%'} />
   </>
  )
}

export default Stats;
