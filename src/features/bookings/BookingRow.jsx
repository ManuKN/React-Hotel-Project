import styled from 'styled-components';
//import { useNavigate } from 'react-router-dom';
// import {
//   HiPencil,
//   HiTrash,
//   HiEye,
//   HiArrowUpOnSquare,
//   HiArrowDownOnSquare,
// } from 'react-icons/hi2';

import Tag from '../../ui/Tag';
//import Menus from 'ui/Menus';
//import Modal from 'ui/Modal';
//import ConfirmDelete from 'ui/ConfirmDelete';
import Table from '../../ui/Table';

//import { useDeleteBooking } from 'features/bookings/useDeleteBooking';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
//import { useCheckout } from 'features/check-in-out/useCheckout';
import { format, isToday } from 'date-fns';
import Menus from '../../ui/Menus';
import { HiArrowDownOnSquareStack, HiArrowUpOnSquareStack, HiEye, HiTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import useCheckOut from '../check-in-out/useCheckOut';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeletebooking } from './useDeletebooking';
import Modal from '../../ui/Modal';

// v1
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  // const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  // const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  // const navigate = useNavigate();

  // We will not allow editing at this point, as it's too complex for bookings... People just need to delete a booking and create a new one

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };
  const navigate = useNavigate()
  const{checkout , isCheckingOut} = useCheckOut()
  const{deleteBooking , isDeleting} = useDeletebooking()

  return (
    <Table.Row role='row'>
      <Modal>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

     <Menus.Menu>
      <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>See Details</Menus.Button>
          {status === 'unconfirmed' && <Menus.Button icon={<HiArrowDownOnSquareStack />} onClick={() => navigate(`/checkin/${bookingId}`)}>Check In</Menus.Button>}
          {status === 'checked-in' && <Menus.Button icon={<HiArrowUpOnSquareStack />} onClick={() => checkout(bookingId) } disabled={isCheckingOut}>Check Out</Menus.Button>}
          {/* <Menus.Button icon={<HiTrash />} onClick={() => {<ConfirmDelete onConfirm={() => deleteBookings(bookingId)} resourceName="bookings" disabled={isDeleting}/>}}>Delete</Menus.Button> */}
          <Modal.Open opens='delete'>
            <Menus.Button icon={<HiTrash />}>Delete Booking</Menus.Button>
          </Modal.Open>
        </Menus.List>
        </Menus.Menu>
        <Modal.Window name='delete'>
          <ConfirmDelete onConfirm={() => deleteBooking(bookingId)} resourceName='booking' disabled={isDeleting} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}


 export default BookingRow;
