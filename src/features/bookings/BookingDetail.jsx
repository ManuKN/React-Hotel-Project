import styled from 'styled-components';
import ButtonText from '../../ui/ButtonText';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import Empty from '../../ui/Empty'
import { useMoveBack } from '../../hooks/useMoveBack';
import Button from '../../ui/Button';
import ButtonGroup from "../../ui/ButtonGroup"
import useBooking from './useBooking';
import Spinner from '../../ui/Spinner';
import BookingDataBox from './BookingDataBox';
import { useNavigate } from 'react-router-dom';
import { HiArrowDownOnSquareStack, HiArrowUpOnSquareStack, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { deleteCabin } from '../../services/apiCabins';
import { useState } from 'react';
import { useDeletebooking } from './useDeletebooking';
import Modal from '../../ui/Modal';
import useCheckOut from '../check-in-out/useCheckout';


const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
 const navigate = useNavigate()
  const{isLoading , booking} = useBooking()
  const{checkout , isCheckingOut} = useCheckOut()
  const{isDeleting , deleteBooking}=useDeletebooking()
  const {status , id:bookingId} = booking ?? {}
  //const bookingId = 24
  //const status = 'unconfirmed'
  const moveBack = useMoveBack()

  if(isLoading) return <Spinner />
  if(!booking) return <Empty resourceName='booking' />
  
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

 
  return (
    <>
    <Modal>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

       <BookingDataBox booking={booking}/>
      <ButtonGroup>
        {status === 'unconfirmed' && <Button icon={<HiArrowDownOnSquareStack />} onClick={() => navigate(`/checkin/${bookingId}`)}>Check In</Button>}
        {status === 'checked-in' && <Button icon={<HiArrowUpOnSquareStack />} onClick={() => {checkout(bookingId)} } disabled={isCheckingOut}>Check Out</Button>}
       <Modal.Open opens='delete'>
        <Button icon={<HiTrash />} variation='danger'>Delete Booking</Button>
       </Modal.Open>
      <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <Modal.Window name='delete'>
         <ConfirmDelete onConfirm={() => deleteBooking(bookingId , {onSettled:()=>navigate(-1)})} resourceName='booking' disabled={isDeleting} />
      </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
