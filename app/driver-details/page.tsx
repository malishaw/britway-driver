import React from "react";
import Image from "next/image";
import DetailComponent from "./DetailComponent";

export default function YourPage() {
  const driverDetails = [
    { label: "Display Name", value: "John Doe" },
    { label: "Unique ID", value: "JD123456" },
    { label: "Email", value: "john.doe@example.com" },
    { label: "Fleet Operator", value: "Unassigned" },
    { label: "Title", value: "Mr." },
    { label: "First Name", value: "John" },
    { label: "Last Name", value: "Doe" },
    { label: "Date Of Birth", value: "05/15/1988" },
    { label: "Mobile Number", value: "+1 (555) 123-4567" },
    { label: "Telephone Number", value: "+1 (555) 987-6543" },
    { label: "Emergency Number", value: "+1 (555) 789-0123" },
    { label: "Address", value: "123 Main St" },
    { label: "City", value: "Anytown" },
    { label: "PostCode", value: "12345" },
    { label: "Country", value: "USA" },
    { label: "Company Name", value: "Doe Transportation LLC" },
    { label: "Company Number", value: "CT987654" },
    { label: "Company VAT Number", value: "VAT123456789" },
    { label: "National Insurance Number", value: "AB123456C" },
    { label: "Bank Account Details", value: "Bank of America - 1234567890" },
    { label: "Insurance Number", value: "INS987654321" },
    { label: "Insurance Expiry Date", value: "12/31/2025" },
    { label: "Driving Licence Number", value: "DL123456789" },
    { label: "Driving Licence Expiry Date", value: "12/31/2026" },
    { label: "PCO Licence Number", value: "PCO987654" },
    { label: "PCO Licence Expiry Date", value: "06/30/2027" },
    { label: "MOT", value: "MOT123456" },
    { label: "MOT Expiry Date", value: "09/30/2024" },
    { label: "PHV Licence Number", value: "PHV654321" },
    { label: "PHV Licence Expiry Date", value: "03/31/2025" },
    { label: "Driver Activity Status", value: "Available" },
    { label: "Driver Licence Address Status", value: "Verified" },
    { label: "BGS Check Status", value: "Checked" },
    { label: "Last Checked Date", value: "02/01/2024" },
  ];

  return (
    <div className="w-full">
      <div className="container mx-auto bg-white p-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Image
              src="/profile-picture.jpeg"
              alt="Profile Picture"
              width={96}
              height={96}
              className="rounded-full mr-6"
            />
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-gray-600">Member since 2021</p>
            </div>
          </div>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Jobs
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Vehicles
            </button>
          </div>
        </div>
        {driverDetails.map((detail, index) => (
          <DetailComponent
            key={index}
            label={detail.label}
            value={detail.value}
          />
        ))}
        <div className="flex gap-2 mt-8">
          <button className="bg-blue-600 text-white px-4 py-2 ">Edit</button>
          <button className="bg-gray-500 text-white px-4 py-2 ">Delete</button>
          <button className="bg-gray-500 text-white px-4 py-2">Logout</button>
          <button className="px-4 py-2 ">Back</button>
        </div>
      </div>
    </div>
  );
}
