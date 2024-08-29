'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DetailComponent from "./DetailComponent";
import {IDriverData} from "@/app/typings/interfaces/driverData";
import {useParams, useRouter} from "next/navigation";
import { useCustomNavigation } from "@/app/hooks";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Row } from "react-day-picker";
import ConfirmationDialog from "@/app/components/shared/confirmation-dialog/ConfirmationDialog";

interface DriverDetail {
  label: string;
  value: string | undefined;
}

export default function YourPage() {
  const [driverData, setDriverData] = React.useState<IDriverData|null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {id} = useParams();
  const router = useRouter();
  const { navigate } = useCustomNavigation();

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
      // {label: "Telephone Number", value: driverData?.personalData?.telephoneNumber},
      // {label: "Emergency Number", value: driverData?.personalData?.emergencyNumber},
      {label: "Address", value: driverData?.personalData?.address},
      {label: "City", value: driverData?.personalData?.city},
      {label: "PostCode", value: driverData?.personalData?.postCode},
      // {label: "Country", value: driverData?.personalData?.country},
      // {label: "Company Name", value: driverData?.personalData?.companyName},
      // {label: "Company Number", value: driverData?.personalData?.companyNumber},
      // {label: "Company VAT Number", value: driverData?.personalData?.companyVatNumber},
      {label: "National Insurance Number", value: driverData?.otherData?.nationalInsuranceNumber},
      // {label: "Bank Account Details", value: driverData?.otherData?.bankAccountDetails},
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
      {label: "Driver Licence Address Status", value: driverData?.otherData?.driverAddressStatus},
      {label: "BGS Check Status", value: driverData?.otherData?.bgsStatus},
      {label: "Last Checked Date", value: driverData?.otherData?.lastCheckedDate},
    ]
  }

const driverDataList = mapDriverData();
const leftSideData = driverDataList.slice(0, Math.ceil(driverDataList.length / 2));
const rightSideData = driverDataList.slice(Math.ceil(driverDataList.length / 2));

  const handleOnClickEdit = (row: DriverDetail) => {
    navigate(`/driver/${id}/update`);
  }

  const handleOnClickDelete = async (row: DriverDetail) => {
    try {
      // Send a DELETE request to the API endpoint
      const response = await fetch(`/api/driver/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
                // If the deletion is successful, navigate to the desired page
        router.push('/driver')
      } else {
                // Handle the error case
        console.error('Failed to delete driver')
      }
    } catch (error) {
      console.error('An error occurred while deleting the driver:', error)
    }
  }

  const handleGoBack = () => {
    router.push('/driver');
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await handleOnClickDelete(mapDriverData()[0]);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto bg-white p-8 w-full">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-7 items-center">
            <Avatar className="w-24 h-24 ">
              <AvatarImage
                src={driverData?.personalData?.photo || "/default-profile-picture.jpeg"}
                alt="Profile Picture"
                className="rounded-full"
              />
            </Avatar>

            <div>
              <h1 className="text-2xl font-bold">
                {driverData?.generalData.displayName || ''}
              </h1>
              {/* <p className="text-gray-600">Member since 2021</p> */}
            </div>
          </div>
          {/* <div className="space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Jobs
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Vehicles
            </button>
          </div> */}
        </div>
  
        {/* Driver Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-lg shadow-md">
        {/* Left Side */}
          <div>
            {mapDriverData().slice(0, Math.ceil(mapDriverData().length / 2)).map((detail, index) => (
              <DetailComponent
                key={index}
                label={detail.label}
                value={detail.value || ''}
              />
            ))}
          </div>
  
          {/* Right Side */}
          <div>
            {mapDriverData().slice(Math.ceil(mapDriverData().length / 2)).map((detail, index) => (
              <DetailComponent
                key={index}
                label={detail.label}
                value={detail.value || ''}
              />
            ))}
          </div>
        </div>
  
        {/* Action Buttons */}
        <div className="flex gap-2 mt-8">
          <button
            className="bg-blue-600 text-white px-4 py-2"
            onClick={() => handleOnClickEdit(mapDriverData()[0])}
          >
            Edit
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2"
            onClick={handleDeleteClick}
          >
            Delete
            </button>          {/* <button className="bg-gray-500 text-white px-4 py-2">Logout</button> */}
          <button className="px-4 py-2" onClick={handleGoBack}>
            Back
          </button>
        </div>
      </div>
  
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        title="Are you sure?"
        description="Do you want to delete this driver?"
        onConfirm={handleConfirmDelete}
        onDecline={handleCancelDelete}
        open={showConfirmation}
      />

    </div>
  );
}
