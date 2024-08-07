import { deleteDriver, getDriver } from "@/app/service";
import { IDriverData } from "@/app/typings/interfaces/driverData";
import { NextRequest, NextResponse } from "next/server";

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   const driverData: IDriverData = await req.json();

//   try {
//     if (!id) {
//       return NextResponse.json(
//         { error: `Error updating driver: id is required` },
//         { status: 400 }
//       );
//     }
//     const user = await updateDriver(id, driverData);
//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: `Error creating driver:${error}` },
//       { status: 500 }
//     );
//   }
// }

// delete driver
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: `Error deleting driver: id is required` },
        { status: 400 }
      );
    }
    const user = await deleteDriver(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error deleting driver:${error}` },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: `Error getting driver: id is required` },
        { status: 400 }
      );
    }
    const user = await getDriver(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Error getting driver:${error}` },
      { status: 500 }
    );
  }
}
