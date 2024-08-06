import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

export const getBookings = () => {
  return prisma.booking.findMany();
};

export const createBookings = (bookings: any) => {
  return prisma.booking.createMany({
    data: bookings,
  });
};
