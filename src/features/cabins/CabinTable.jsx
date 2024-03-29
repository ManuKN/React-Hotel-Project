import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import {useSearchParams} from "react-router-dom"
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";

//import Filter from "../../ui/Filter";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const[searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if(!cabins.length) return <Empty resource="cabins" />

  const FilterValue = searchParams.get("discount") || "all"

  let FilterCabins; 
  if(FilterValue === "all")
  FilterCabins = cabins;

  if(FilterValue === "no-discount")
  FilterCabins = cabins.filter((cabin) => cabin.discount === 0)

  if(FilterValue === "with-discount")
  FilterCabins = cabins.filter((cabin) => cabin.discount > 0)

  const sortBY = searchParams.get("SortBy") || "startDate-asc"

  const[field , direction] = sortBY.split("-")
  const modifier = direction === "asc" ? 1 : -1
  const sortedCabins = FilterCabins?.sort((a,b) => (a[field]- b[field])*modifier)

  
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          //data={cabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        <Table.Footer>
          <Pagination count={8} />
        </Table.Footer>

      </Table>
    </Menus>
  );
}

export default CabinTable;
