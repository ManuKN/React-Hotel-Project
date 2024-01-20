import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"
import TableOperations from "../../ui/TableOperations"

function CabinTableOperation(){
    return(
        <TableOperations>
            <Filter Filterfield='discount' type options={[
                {value:"all" , label:'All'},
                {value:"no-discount" , label:'No-discount'},
                {value:"with-discount" , label:'With-discount'},
            ]}/>
            <SortBy options={[
                {value:"name-asc", label:"Sort by name(A-Z)"},
                {value:"name-desc", label:"Sort by name(Z-A)"},
                {value:"regularPrice-asc", label:"Sort by Price(Low first)"},
                {value:"regularPrice-desc", label:"Sort by Price(High first)"},
                {value:"maxCapacity-asc", label:"Sort by Capacity(Low first)"},
                {value:"maxCapacity-desc", label:"Sort by Capacity(High first)"},
            ]} />
        </TableOperations>
    )
}

export default CabinTableOperation