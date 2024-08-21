"use client";

import React, { FC, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {toast} from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IDriverData } from "@/app/typings/interfaces/driverData";
import axios from "axios";
import { CheckIcon } from '@heroicons/react/24/outline';

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
  // .min(2, {
  //   message: "Insurance details must be at least 2 characters.",
  // }),
  insuranceExpiryDate: z.string(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "Insurance expiry date must be in the format YYYY-MM-DD.",
  // }),
  drivingLicence: z.string(),
  // .min(5, {
  //   message: "Driving licence number must be at least 5 characters.",
  // }),
  drivingLicenceExpiryDate: z.string(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "Driving licence expiry date must be in the format YYYY-MM-DD.",
  // }),
  PCOLicence: z.string(),
  // .min(5, {
  //   message: "PCO licence number must be at least 5 characters.",
  // }),
  PCOLicenceExpiryDate: z.string(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "PCO licence expiry date must be in the format YYYY-MM-DD.",
  // }),
  MOTLicence: z.string(),
  // .min(5, {
  //   message: "PCO licence number must be at least 5 characters.",
  // }),
  MOTLicenceExpiryDate: z.string(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "PCO licence expiry date must be in the format YYYY-MM-DD.",
  // }),
  PHVLicence: z.string(),
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
      // file: "",
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
          onCreate({...response.data, ...requestData});
          toast("Updated successfully")
        },
        (error) => {
          toast("Updated failed")
        }
      );
      return;
    }
  }

  //   const fileInputRef = React.useRef(null);

  //   const handleClick = () => {
  //     fileInputRef.current.click();
  //   };

  //   const handleFileChange = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       console.log("Selected file:", file);
  //     }
  //   };

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

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="insurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Insurance </FormLabel>
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
                  <FormLabel>Insurance Expiry Date</FormLabel>
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
              name="drivingLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driving Licence</FormLabel>
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
              name="PCOLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PCO Licence</FormLabel>
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
              name="MOTLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MOT</FormLabel>
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
              name="PHVLicence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PHV Licence</FormLabel>
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
          {/*<div className="grid grid-cols-2 gap-4">*/}
          {/*    <FormField*/}
          {/*        control={form.control}*/}
          {/*        name="username"*/}
          {/*        render={({ field }) => (*/}
          {/*            <FormItem>*/}
          {/*                <FormLabel>Driver Income(%)</FormLabel>*/}
          {/*                <FormControl>*/}
          {/*                    <Input placeholder="Driver Income(%)" {...field} />*/}
          {/*                </FormControl>*/}

          {/*                <FormMessage />*/}
          {/*            </FormItem>*/}
          {/*        )}*/}
          {/*    />*/}
          {/*    <FormField*/}
          {/*        name="uniqueId"*/}
          {/*        control={form.control}*/}

          {/*        render={({ field }) => (*/}
          {/*            <FormItem>*/}
          {/*                <FormLabel>Bace Address</FormLabel>*/}
          {/*                <FormControl>*/}
          {/*                    <Input placeholder="Bace Address" {...field} />*/}
          {/*                </FormControl>*/}
          {/*                <FormMessage />*/}
          {/*            </FormItem>*/}
          {/*        )}*/}
          {/*    />*/}
          {/*</div>*/}
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
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="additionalFiles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Files</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              name="file"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="mt-[33px]"
                      placeholder="File"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <Button variant="secondary" type="submit">
              + New File
            </Button>
          </div>
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
