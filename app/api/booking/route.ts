import { NextRequest, NextResponse } from "next/server";
import { createBookings, getBookings } from "@/app/service/bookingService";

export async function GET() {
  try {
    const booking = await getBookings();
    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error getting booking: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const bookings = await req.json();

  try {
    const user = await createBookings(bookings);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error creating booking:${error}` },
      { status: 500 }
    );
  }
}
