import { useAuth } from '@clerk/clerk-react';

async function createBooking(bookingData) {
  const { getToken } = useAuth();
  const token = await getToken();

  const response = await fetch('https://homestay-booking-backend.vercel.app/api/bookings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  return response.json();
}