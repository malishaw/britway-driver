import { List } from 'postcss/lib/list';
import prisma from '../../lib/prisma';
import { IDriverData } from '../typings/interfaces/driverData';

export const createDriver = (driverData: IDriverData) => {
  return prisma.driverData.create({
    data: driverData,
  });
};

export const getDriver = (id: string) => {
  return prisma.driverData.findUnique({
    where: { id },
  });
};

export const getDrivers = () => {
  return prisma.driverData.findMany({
    where: { isDeleted: false },
    select: {
      generalData: {
        select: {
          displayName: true,
          email: true,
          uniqueId: true,
        },
      },
      id: true,
      personalData: {
        select: {
          mobileNumber: true,
        },
      },
    },
  });
};

export const updateDriver = (id: string, driverData: IDriverData) => {
  return prisma.driverData.update({
    where: { id },
    data: driverData,
  });
};

export const deleteDriver = (id: string) => {
  return prisma.driverData.update({
    where: { id },
    data: { isDeleted: true },
  });
};
