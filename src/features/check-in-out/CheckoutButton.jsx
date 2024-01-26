import Button from '../../ui/Button';
import useCheckOut from './useCheckout';


function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckOut()

  return (
    <Button
      variation='primary'
      size='small'
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
