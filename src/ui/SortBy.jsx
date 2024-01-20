import Select from "./Select"
import {useSearchParams} from "react-router-dom"

function SortBy({options}){
    const[searchParams , setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("SortBy") || ""
    function handleClick(e){
        searchParams.set("SortBy" , e.target.value);
        setSearchParams(searchParams)
    }
    return (
       <Select options={options} type='white' onChange={handleClick} value={sortBy}/>
    )
}
export default SortBy