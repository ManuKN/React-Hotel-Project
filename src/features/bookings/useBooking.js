import { useQuery } from "@tanstack/react-query"
import { getBooking } from "../../services/apiBookings"
import { useParams } from "react-router"



function useBooking() {
   const{bookingId} = useParams()
    console.log(bookingId);
const {isLoading , data:booking , error } = useQuery({
    queryKey:["bookings"],
    queryFn:() => getBooking(bookingId),
    retry:false,
})
  return {booking , error , isLoading}
}

export default useBooking