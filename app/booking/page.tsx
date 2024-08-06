"use client";

import { useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useExcelData } from "../hooks";
import { BookingTable } from "../components/booking-table";
import { type Booking } from "../typings";

export default function Booking() {
  console.log("abc")
  const fileInput = useRef<HTMLInputElement>(null);

  const { data, excelToData } = useExcelData();

  const createBookings = () => {
    const bookings = (data as Booking[]).map((x) => ({
      email: x.Email,
      journeyDate: x["Journey date"],
      refId: x["Ref ID"],
      driver: x.Driver,
      status: x.Status,
      driverIncome: x["Driver income"],
      total: x.Total,
      payments: x.Payments,
      vehicle: x.Vehicle,
      vehicleType: x["Vehicle type"],
      totalNet: x["Total (net)"],
      discount: x.Discount,
      passengerName: x["Passenger name"],
      flightNumber: x["Flight number"],
      flightLandingTime: x["Flight landing time"],
      arrivingFrom: x["Arriving from"],
      flightDepartureNumber: x["Flight departure number"],
      serviceDuration: x["Service duration"],
      serviceType: x["Service type"],
      flightDepartureTime: x["Flight departure time"],
      flightDepartureTo: x["Flight departure to"],
      phoneNumber: x["Phone number"],
      pickup: x.Pickup,
      dropoff: x.Dropoff,
      via: x.Via,
      passengers: x.Passengers,
      suitcases: x.Suitcases,
      carryOn: x["Carry-on"],
      childSeats: x["Child seats"],
      boosterSeats: x["Booster seats"],
      infantSeats: x["Infant seats"],
      wheelchairs: x.Wheelchairs,
      waitingTime: x["Waiting time"],
      meetGreet: x["Meet & Greet"],
      source: x.Source,
      customer: x.Customer,
      departments: x.Departments,
      leadName: x["Lead email"],
      leadEmail: x["Lead email"],
      leadPhoneNumber: x["Lead phone number"],
      createdAt: x["Created at"],
      updatedAt: x["Updated at"],
      currency: x.Currency,
      trackingHistory: x["Tracking History"],
    }));

    try {
      axios.post("/api/booking", bookings).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 w-screen lg:w-80">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Booking</h1>

        <div className="flex gap-5">
          <Button disabled={data?.length === 0} onClick={createBookings}>
            Save
          </Button>
          <Button onClick={() => fileInput.current?.click()}>Import</Button>
          <input
            ref={fileInput}
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={(e) => excelToData(e.target.files?.[0])}
          />
        </div>
      </div>
      <div
        className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <BookingTable data={data as any} />
      </div>
    </div>
  );
}
