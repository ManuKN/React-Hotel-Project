import { useQuery, useQueryClient } from "@tanstack/react-query"
import {getBookings} from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

 export function useBookings(){
    const[searchParams] = useSearchParams();
    const Filtervalue = searchParams.get('status');
    const queryClient = useQueryClient();
    //Filter
    const Filter = !Filtervalue || Filtervalue === "all" ? null :
     {field:'status',value:Filtervalue}; 
    //{field:'totalPrice' , value:5000 , method:'gte'};

    //Sort
    const SortByRow = searchParams.get('SortBy') || "startDate-desc";
    const [field , direction] = SortByRow.split("-");
    console.log(field);
    const sortBy = {field , direction};

    //Pagination
    const currentpage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    //Query
    const{error , data:{data:bookings , count} = {}, isLoading} =  
       useQuery({
        queryKey : ["bookings" ,Filter , sortBy , currentpage],
        queryFn : ()=>getBookings({Filter , sortBy , currentpage}),
    })

    //Pre-fetching
    const pageCount = Math.ceil(count / PAGE_SIZE)
    if(currentpage < pageCount)
    {
    queryClient.prefetchQuery({
        queryKey : ["bookings" ,Filter , sortBy , currentpage + 1],
        queryFn : ()=>getBookings({Filter , sortBy , currentpage : currentpage + 1}),
    })}

    if(currentpage > 1)
    {
        queryClient.prefetchQuery({
            queryKey : ["bookings" ,Filter , sortBy , currentpage - 1],
            queryFn : ()=>getBookings({Filter , sortBy , currentpage : currentpage - 1}),
        }) 
    }
    
    return {error , bookings , isLoading , count}
}
