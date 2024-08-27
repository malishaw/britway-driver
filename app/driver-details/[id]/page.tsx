'use client';
import React, {useEffect} from "react";
import Image from "next/image";
import DetailComponent from "./DetailComponent";
import {IDriverData} from "@/app/typings/interfaces/driverData";
import {useParams} from "next/navigation";

interface DriverDetail {
  label: string;
  value: string | undefined;
}

export default function YourPage() {

  const [driverData, setDriverData] = React.useState<IDriverData|null>(null);
  const {id} = useParams();


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`/api/driver/${id}`);
    const data:IDriverData = await response.json();
    setDriverData(data);
  }

  const mapDriverData= (): DriverDetail[] =>{
    return [
      {label: "Display Name", value: driverData?.generalData.displayName},
      {label: "Unique ID", value: driverData?.generalData.uniqueId},
      {label: "Email", value: driverData?.generalData.email},
      {label: "Fleet Operator", value: driverData?.generalData.fleetOperator},
      {label: "Title", value: driverData?.personalData?.title},
      {label: "First Name", value: driverData?.personalData?.firstName},
      {label: "Last Name", value: driverData?.personalData?.lastName},
      {label: "Date Of Birth", value: driverData?.personalData?.dateOfBirth},
      {label: "Mobile Number", value: driverData?.personalData?.mobileNumber},
      {label: "Telephone Number", value: driverData?.personalData?.telephoneNumber},
      {label: "Emergency Number", value: driverData?.personalData?.emergencyNumber},
      {label: "Address", value: driverData?.personalData?.address},
      {label: "City", value: driverData?.personalData?.city},
      {label: "PostCode", value: driverData?.personalData?.postCode},
      {label: "Country", value: driverData?.personalData?.country},
      {label: "Company Name", value: driverData?.personalData?.companyName},
      {label: "Company Number", value: driverData?.personalData?.companyNumber},
      {label: "Company VAT Number", value: driverData?.personalData?.companyVatNumber},
      {label: "National Insurance Number", value: driverData?.otherData?.nationalInsuranceNumber},
      {label: "Bank Account Details", value: driverData?.otherData?.bankAccountDetails},
      {label: "Insurance Number", value: driverData?.otherData?.insurance},
      {label: "Insurance Expiry Date", value: driverData?.otherData?.insuranceExpiryDate},
      {label: "Driving Licence Number", value: driverData?.otherData?.drivingLicence},
      {label: "Driving Licence Expiry Date", value: driverData?.otherData?.drivingLicenceExpiryDate},
      {label: "PCO Licence Number", value: driverData?.otherData?.PCOLicence},
      {label: "PCO Licence Expiry Date", value: driverData?.otherData?.PCOLicenceExpiryDate},
      {label: "MOT", value: driverData?.otherData?.MOTLicence},
      {label: "MOT Expiry Date", value: driverData?.otherData?.MOTLicenceExpiryDate},
      {label: "PHV Licence Number", value: driverData?.otherData?.PHVLicence},
      {label: "PHV Licence Expiry Date", value: driverData?.otherData?.PHVLicenceExpiryDate},
      {label: "Driver Activity Status", value: driverData?.otherData?.driverActivityStatus},
      {label: "Driver Licence Address Status", value: driverData?.otherData?.driveAddressStatus},
      {label: "BGS Check Status", value: driverData?.otherData?.bgsStatus},
      {label: "Last Checked Date", value: driverData?.otherData?.lastCheckedDate},
    ]
  }

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
        {mapDriverData()?.map((detail, index) => (
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
