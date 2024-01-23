import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function useCheckOut() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
const{mutate:checkout , isLoading:isCheckingOut} = useMutation({
    mutationFn:(bookingId) => updateBooking(bookingId ,{
        status:"checked-out",
    }),
    onSuccess:(data) => {
        toast.success(`Booking #${data.id} successfully checked OUT`);
        queryClient.invalidateQueries({active:true});
        navigate('/')
    },
   onError:()=>toast.error("There was a error while checking OUT")
})

  return {checkout , isCheckingOut}
}

export default useCheckOut