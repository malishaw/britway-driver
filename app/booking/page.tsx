
"use client";

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useExcelData } from "../hooks";
import { BookingTable } from "../components/booking-table";
import { type Booking } from "../typings";

export default function Booking() {

  const fileInput = useRef<HTMLInputElement>(null);
  const { data, excelToData } = useExcelData();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Fetch bookings from the backend when the component mounts
    axios.get("/api/booking")
      .then((response) => {
        console.log("Fetched bookings:", response.data); // Log the fetched data
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  const handleFileChange = (file: File | undefined) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    try {
      excelToData(file);
    } catch (error) {
      console.error("Error processing the file:", error);
    }
  };




  const createBookings = () => {
    const newBookings = (data as Booking[]).map((x) => ({
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
      leadName: x["Lead name"],
      leadEmail: x["Lead email"],
      leadPhoneNumber: x["Lead phone number"],
      createdAt: x["Created at"],
      updatedAt: x["Updated at"],
      currency: x.Currency,
      trackingHistory: x["Tracking History"],
    }));
  
    console.log("New bookings to create:", newBookings); // Log the new bookings data
  
    axios.post("/api/booking", newBookings)
      .then((response) => {
        console.log("Post response:", response);
        // Handle success, e.g., update the local state or show a success message
      })
      .catch((error) => {
        console.error("Error creating bookings:", error);
      });
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
            onChange={(e) => handleFileChange(e.target.files?.[0])}
          />
        </div>
      </div>
      <div
        className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <BookingTable data={bookings} />
      </div>
    </div>
  );
}


