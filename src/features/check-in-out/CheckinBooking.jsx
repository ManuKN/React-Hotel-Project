import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "../bookings/BookingDataBox";
import { useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;


function CheckinBooking() {
 const{booking , isLoading} = useBooking()
 const{checkin , isCheckingIn}= useCheckin()
 const{isLoading : isLoadingSettings , settings} = useSettings()
 const[confirmdPaid , setConfirmPaid] = useState(false)
 const[addbreakfast , setAddbreakfast] = useState(false)
  const moveBack = useMoveBack();
  const{id:bookingId , guests , totalPrice , numGuests , hasBreakfast , numNights}= booking ?? {}
  const Optionalbreakfastprice = settings?.breakFastPrice * numNights * numGuests;

  useEffect(()=>setConfirmPaid(booking?.isPaid ?? false),[booking])
  if(isLoading || isLoadingSettings) return <Spinner />

 

  function handleCheckin() {
    if(!confirmdPaid) return
if(addbreakfast)
{
 checkin({bookingId , breakfast:{
  hasBreakfast:true,
  extraPrice:Optionalbreakfastprice,
  totalPrice: totalPrice + Optionalbreakfastprice,
 }})
}
else{
  checkin({bookingId , breakfast : {}})
}

  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      
      <BookingDataBox booking={booking} />
      
      { !hasBreakfast && <Box>
        <Checkbox id='breakfast' checked={addbreakfast} onChange={() =>
        {setAddbreakfast((add) => !add , setConfirmPaid(false))}} >Want to add breakfast for {Optionalbreakfastprice}?</Checkbox>
      </Box>}
      <Box>
      <Checkbox checked={confirmdPaid} 
      onChange={() => setConfirmPaid((confirm) => !confirm)} disabled={confirmdPaid || isCheckingIn} id='confirm'>
        I Confirm that {guests.fullName} 
        has paid the total amount
        {!addbreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + Optionalbreakfastprice)} (${formatCurrency(totalPrice)} + ${formatCurrency(Optionalbreakfastprice)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmdPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
