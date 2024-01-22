import { useQuery } from "@tanstack/react-query"
import {getBookings} from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

 export function useBookings(){
    const[searchParams] = useSearchParams();
    const Filtervalue = searchParams.get('status');
    const Filter = !Filtervalue || Filtervalue === "all" ? null :
     {field:'status',value:Filtervalue}; 
    //{field:'totalPrice' , value:5000 , method:'gte'};

    const SortByRow = searchParams.get('SortBy') || "startDate-desc";
    const [field , direction] = SortByRow.split("-");
    console.log(field);
    const sortBy = {field , direction};

    const{error , data:bookings , isLoading} =  
       useQuery({
        queryKey : ["bookings" ,Filter , sortBy],
        queryFn : ()=>getBookings({Filter , sortBy}),
    })
    return {error , bookings , isLoading}
}
