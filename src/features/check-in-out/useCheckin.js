import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function useCheckin() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
const{mutate:checkin , isLoading:isCheckingIn} = useMutation({
    mutationFn:({bookingId , breakfast}) => updateBooking(bookingId ,{
        status:"checked-in",
        isPaid:true,
        ...breakfast,   
    }),
    onSuccess:(data) => {
        toast.success(`Booking #${data.id} successfully checked IN`);
        queryClient.invalidateQueries({active:true});
        navigate('/')
    },
   onError:()=>toast.error("There was a error while checking IN")
})

  return {checkin , isCheckingIn}
}

export default useCheckin