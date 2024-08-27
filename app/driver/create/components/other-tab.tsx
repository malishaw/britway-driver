"use client";

import React, { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IDriverData } from "@/app/typings/interfaces/driverData";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/24/outline";
import FileUpload from "@/app/components/file-upload";
import { Label } from "@/components/ui/label";
import { ProfilePictureUpload } from "./ProfilePictureUpload";

const formSchema = z.object({
  nationalInsuranceNumber: z.string(),
  // .min(5, {
  //   message: "National Insurance Number must be at least 5 characters.",
  // }),
  bankAccountDetails: z.string(),
  // .min(5, {
  //   message: "Bank account details must be at least 5 characters.",
  // }),
  insurance: z.string(),
  insuranceFile: z.string().optional(),
  insuranceVerifyStatus: z.string().optional(),
  insuranceLastVerifyDate: z.string().optional(),
  // .min(2, {
  //   message: "Insurance details must be at least 2 characters.",
  // }),
  insuranceExpiryDate: z.string(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "Insurance expiry date must be in the format YYYY-MM-DD.",
  // }),
  drivingLicence: z.string(),
  drivingLicenseFile: z.string().optional(),
  drivingLicenseVerifyStatus: z.string().optional(),
  drivingLicenseLastVerifyDate: z.string().optional(),
  // .min(5, {
  //   message: "Driving licence number must be at least 5 characters.",
  // }),
  drivingLicenceExpiryDate: z.string(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "Driving licence expiry date must be in the format YYYY-MM-DD.",
  // }),
  PCOLicence: z.string(),
  PCOLicenseFile: z.string().optional(),
  PCOLicenseVerifyStatus: z.string().optional(),
  PCOLicenseLastVerifyDate: z.string().optional(),
  // .min(5, {
  //   message: "PCO licence number must be at least 5 characters.",
  // }),
  PCOLicenceExpiryDate: z.string(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "PCO licence expiry date must be in the format YYYY-MM-DD.",
  // }),
  MOTLicence: z.string(),
  MOTLicenseFile: z.string().optional(),
  MOTLicenseVerifyStatus: z.string().optional(),
  MOTLicenseLastVerifyDate: z.string().optional(),
  // .min(5, {
  //   message: "PCO licence number must be at least 5 characters.",
  // }),
  MOTLicenceExpiryDate: z.string(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "PCO licence expiry date must be in the format YYYY-MM-DD.",
  // }),
  PHVLicence: z.string(),
  PHVLicenseFile: z.string().optional(),
  PHVLicenseVerifyStatus: z.string().optional(),
  PHVLicenseLastVerifyDate: z.string().optional(),
  // .min(5, {
  //   message: "PHV licence number must be at least 5 characters.",
  // }),
  PHVLicenceExpiryDate: z.string(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "PHV licence expiry date must be in the format YYYY-MM-DD.",
  // }),
  driverActivityStatus: z.enum(["Available", "Unavailable"]),
  //    {
  //   message: "Driver activity status must be either 'active' or 'inactive'.",
  // }),
  driverAddressStatus: z.enum(["Verified", "Not Verified"]),
  //    {
  //   message: "Driver activity status must be either 'active' or 'inactive'.",
  // }),
  bgsStatus: z.enum(["Checked", "Unchecked"]),
  //    {
  //   message: "Driver activity status must be either 'active' or 'inactive'.",
  // }),
  lastCheckedDate: z.string(),
  // .min(5, {
  //   message: "PHV licence number must be at least 5 characters.",
  // }),
  additionalFiles: z.string(),
  // .min(2, {
  //   message: "Title details must be at least 2 characters.",
  // }),
  file: z.string(),
  // .min(2, {
  //   message: "file details must be at least 2 characters.",
  // }),
  
});
type FormType = z.infer<typeof formSchema>;

export interface IOtherTabProps {
  onCreate: (data: IDriverData) => void;
  data: IDriverData | null;
}
const OtherTab: FC<IOtherTabProps> = ({ onCreate, data }) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationalInsuranceNumber: "",
      bankAccountDetails: "",
      insurance: "",
      insuranceExpiryDate: "",
      drivingLicence: "",
      drivingLicenceExpiryDate: "",
      PCOLicence: "",
      PCOLicenceExpiryDate: "",
      MOTLicence: "",
      MOTLicenceExpiryDate: "",
      PHVLicence: "",
      PHVLicenceExpiryDate: "",
      driverActivityStatus: "Unavailable",
      driverAddressStatus: "Not Verified",
      bgsStatus: "Unchecked",
      lastCheckedDate: "",
      additionalFiles: "",
      file: "",
      
    },
  });

  function onSubmit(values: FormType) {
    if (data?.generalData) {
      const requestData: IDriverData = {
        generalData: {
          ...data?.generalData,
        },
        personalData: {
          ...data?.personalData,
        },
        otherData: values,
      };
      axios.put(`/api/driver/${data.id}`, requestData).then(
        (response) => {
          onCreate({ ...response.data, ...requestData });
          Swal.fire({
            icon: "success",
            title: "Created successfully",
            text: "The driver's other data has been created.",
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while creating the driver data.",
          });
        }
      );
      return;
    }
  }

  useEffect(() => {
    if (data?.otherData) {
      form.reset(data.otherData);
    }
  }, [data]);

  return (
    <Form {...form}>
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="nationalInsuranceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National Insurance Number</FormLabel>
                  <FormControl>
                    <Input placeholder="National Insurance Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bankAccountDetails"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account Details</FormLabel>
                  <FormControl>
                    <Input placeholder="Bank Account Details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-t pt-2">
            <Label className="text-lg">Profile Picture </Label>
          </div>
          <ProfilePictureUpload control={form.control}/>
          {/* <FormField
            name="insuranceFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FileUpload
                  uploadedFiles={field.value ? [field.value] : undefined}
                  onUploadComplete={(files) => field.onChange(files[0])}
                />
              </FormItem>
            )}
          /> */}

          <div className="border-t pt-2">
            <Label className="text-lg">Insurance</Label>
          </div>

          <FormField
            name="insuranceFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FileUpload
                  uploadedFiles={field.value ? [field.value] : undefined}
                  onUploadComplete={(files) => field.onChange(files[0])}
                />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="insurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input placeholder=" Insurance " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="insuranceExpiryDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Insurance Expiry Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="insuranceVerifyStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Verified">Verified</SelectItem>
                      <SelectItem value="Unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="insuranceLastVerifyDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Last Verify Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-t pt-2">
            <Label className="text-lg">Driving Licence</Label>
          </div>

          <FormField
            name="drivingLicenseFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FileUpload
                  uploadedFiles={field.value ? [field.value] : undefined}
                  onUploadComplete={(files) => field.onChange(files[0])}
                />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="drivingLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driving Licence Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Driving Licence" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="drivingLicenceExpiryDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driving Licence Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Driving Licence Expiry Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="drivingLicenseVerifyStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Verified">Verified</SelectItem>
                      <SelectItem value="Unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="drivingLicenseLastVerifyDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Verify Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Last Verify Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-t pt-2">
            <Label className="text-lg">PCO Licence</Label>
          </div>

          <FormField
            name="PCOLicenseFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FileUpload
                  uploadedFiles={field.value ? [field.value] : undefined}
                  onUploadComplete={(files) => field.onChange(files[0])}
                />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="PCOLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PCO Licence Number</FormLabel>
                  <FormControl>
                    <Input placeholder="PCO Licence " {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="PCOLicenceExpiryDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PCO Licence Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="PCO Licence Expiry Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="PCOLicenseVerifyStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Verified">Verified</SelectItem>
                      <SelectItem value="Unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="PCOLicenseLastVerifyDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Verify Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Last Verify Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-t pt-2">
            <Label className="text-lg">MOT</Label>
          </div>

          <FormField
            name="MOTLicenseFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FileUpload
                  uploadedFiles={field.value ? [field.value] : undefined}
                  onUploadComplete={(files) => field.onChange(files[0])}
                />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="MOTLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MOT Number</FormLabel>
                  <FormControl>
                    <Input placeholder="MOT " {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="MOTLicenceExpiryDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MOT Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="MOT Expiry Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="MOTLicenseVerifyStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Verified">Verified</SelectItem>
                      <SelectItem value="Unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="MOTLicenseLastVerifyDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Last Verify Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-t pt-2">
            <Label className="text-lg">PHV Licence</Label>
          </div>

          <FormField
            name="PHVLicenseFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FileUpload
                  uploadedFiles={field.value ? [field.value] : undefined}
                  onUploadComplete={(files) => field.onChange(files[0])}
                />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="PHVLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PHV Licence Number</FormLabel>
                  <FormControl>
                    <Input placeholder="PHV Licence" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="PHVLicenceExpiryDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PHV Licence Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="PHV Licence Expiry Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="PHVLicenseVerifyStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Verified">Verified</SelectItem>
                      <SelectItem value="Unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="PHVLicenseLastVerifyDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Last Verify Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-t pt-2" />

          <FormField
            name="driverActivityStatus"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Activity Status</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a correct status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>

                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="driverAddressStatus"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Licence Address Status</FormLabel>
                <div style={{ position: "relative" }}>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value} // Ensure the Select component takes full width
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a correct status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Verified">Verified</SelectItem>
                      <SelectItem value="Not Verified">Not Verified</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.value === "Verified" && (
                    <CheckIcon
                      style={{
                        position: "relative", // Changed from "relative" to "absolute"
                        top: "-4.2rem", // Adjust this value as needed
                        float: "inline-end",
                        color: "green",
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                    />
                  )}
                </div>
                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              name="bgsStatus"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BGS Check Status</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a correct status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Checked">Checked</SelectItem>
                      <SelectItem value="Unchecked">Unchecked</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastCheckedDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Checked Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Last Checked Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label>Additional Files</Label>
          </div>

          <FormField
            name="file"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FileUpload
                  uploadedFiles={field.value ? [field.value] : undefined}
                  onUploadComplete={(files) => field.onChange(files[0])}
                />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Button type="submit">Add</Button>
            <Button variant="outline" type="submit">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default OtherTab;
