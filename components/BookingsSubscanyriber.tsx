// components/BookingsSubscriber.tsx

import { useEffect } from 'react';
import { supabase } from '../components/supabaseClient'; // Ensure correct path

interface Booking {
  // Define the structure of a booking, e.g.,
  id: number;
  name: string;
  // Add other fields as needed
}

interface Props {
  onNewBooking: (booking: Booking) => void;
}

const BookingsSubscriber: React.FC<Props> = ({ onNewBooking }) => {
  useEffect(() => {
    const subscription = (supabase.from('bookings') as any)
      .on('INSERT', (payload: { new: Booking }) => {
        console.log('New booking:', payload.new);
        onNewBooking(payload.new);
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, [onNewBooking]);

  return null;
};

export default BookingsSubscriber;
