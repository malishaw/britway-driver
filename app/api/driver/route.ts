import { NextRequest, NextResponse } from "next/server";

import { createDriver, getDrivers} from "@/app/service";
import { IDriverData } from "@/app/typings/interfaces/driverData";

export async function POST(req: NextRequest) {
  const driverData: IDriverData = await req.json();

  try {
    const user = await createDriver(driverData);
    console.log(driverData.generalData);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error creating driver:${error}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const drivers = await getDrivers();
    return NextResponse.json(drivers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error getting drivers: ${error}` },
      { status: 500 }
    );
  }
}
