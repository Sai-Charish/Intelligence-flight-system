export async function getCities() {
  const response = await fetch("http://localhost:8000/api/cities/");
  const data = await response.json();
  return data;
}

export function getDurationMins(flight) {
  const [dh, dm] = flight.departure_time.split(":").map(Number);
  const [ah, am] = flight.arrival_time.split(":").map(Number);
  return ah * 60 + am - (dh * 60 + dm);
}

export async function getFlights(source, destination, date) {
  try {
    const res = await fetch(
      `http://localhost:8000/api/flights/?source=${source}&destination=${destination}&date=${date}`,
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export const ROWS = 30;
export const LEFT_LETTERS = ["A", "B", "C"];
export const RIGHT_LETTERS = ["D", "E", "F"];
export const ALL_LETTERS = [...LEFT_LETTERS, ...RIGHT_LETTERS];

export function seatId(row, letter) {
  return `${row}${letter}`;
}

export function getSeatStatus(seat, bookedSeats, selectedSeats) {
  if (bookedSeats.includes(seat)) return "booked";
  if (selectedSeats.includes(seat)) return "selected";
  return "available";
}

export async function getTrips() {
  try {
    const res = await fetch("http://localhost:8000/api/bookings/?user=1");
    const bookings = await res.json();

    // Fetch flight details for each booking in parallel
    const enriched = await Promise.all(
      bookings.map(async (booking) => {
        try {
          const flightRes = await fetch(
            `http://localhost:8000/api/flights/${booking.flight}/`,
          );
          const flight = await flightRes.json();

          // Compute duration from departure and arrival time
          const [depH, depM] = flight.departure_time.split(":").map(Number);
          const [arrH, arrM] = flight.arrival_time.split(":").map(Number);
          const totalMins = arrH * 60 + arrM - (depH * 60 + depM);
          const hrs = Math.floor(totalMins / 60);
          const mins = totalMins % 60;
          const duration =
            hrs > 0 && mins > 0
              ? `${hrs}h ${mins}m`
              : hrs > 0
                ? `${hrs}h`
                : `${mins}m`;

          return { ...booking, flightDetails: { ...flight, duration } };
        } catch {
          return { ...booking, flightDetails: null };
        }
      }),
    );

    return enriched;
  } catch (err) {
    console.error("Failed to fetch trips", err);
  }
}

// export async function getTrips() {
//   try {
//     const response = await fetch("http://localhost:8000/api/bookings/?user=1");
//     const booking = await response.json();
//     console.log(booking);
//     return booking;
//   } catch (e) {
//     console.log(e);
//   }
// }

// export async function getFlightById(id) {
//   try {
//     const response = await fetch(`http://localhost:8000/api/flights/${id}/`);
//     const flightDetails = await response.json();

//     return flightDetails;
//   } catch (e) {
//     console.log(e);
//   }
// }
