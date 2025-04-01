"use client";

import React, { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

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
import { IDriverData } from "@/app/typings/interfaces/driverData";
import axios from "axios";
import FileUpload from "@/app/components/file-upload";
import Swal from "sweetalert2";
import ProfilePhoto from "@/app/components/profile-photo";

const formSchema = z.object({
  title: z.string().nullish(),
  // .min(2, {
  //   message: "Title must be at least 2 characters.",
  // }),
  firstName: z.string().nullish(),
  // .min(2, {
  //   message: "First name must be at least 2 characters.",
  // }),
  lastName: z.string().nullish(),
  // .min(2, {
  //   message: "Last name must be at least 2 characters.",
  // }),
  dateOfBirth: z.string().nullish(),
  // .regex(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: "Date of birth must be in the format YYYY-MM-DD.",
  // }),
  mobileNumber: z.string().nullish(),
  // .regex(/^\d{10,15}$/, {
  //   message: "Mobile number must be between 10 and 15 digits.",
  // }),
  telephoneNumber: z.string().nullish(),
  // .regex(/^\d{10,15}$/, {
  //   message: "Telephone number must be between 10 and 15 digits.",
  // }),
  emergencyNumber: z.string().nullish(),
  // .regex(/^\d{10,15}$/, {
  //   message: "Emergency number must be between 10 and 15 digits.",
  // }),
  address: z.string().nullish(),
  // .min(5, {
  //   message: "Address must be at least 5 characters.",
  // }),
  city: z.string().nullish(),
  // .min(2, {
  //   message: "City must be at least 2 characters.",
  // }),
  postCode: z.string().nullish(),
  // .regex(/^\d{2,10}$/, {
  //   message: "Company number must be between 2 and 10 digits.",
  // }),
  county: z.string().nullish(),
  // .min(2, {
  //   message: "County must be at least 2 characters.",
  // }),
  country: z.string().nullish(),
  // .min(2, {
  //   message: "Country must be at least 2 characters.",
  // }),
  companyName: z.string().nullish(),
  // .min(2, {
  //   message: "Company name must be at least 2 characters.",
  // }),
  companyNumber: z.string().nullish(),
  // .regex(/^\d{2,10}$/, {
  //   message: "Company number must be between 2 and 10 digits.",
  // }),
  companyVatNumber: z.string().nullish(),
  // .regex(/^\d{2,15}$/, {
  //   message: "Company VAT number must be between 2 and 15 digits.",
  // }),
  note: z.string().nullish(),
  // .min(2, {
  //   message: "Note must be at least 2 characters.",
  // }),
  photo: z.string().nullish().optional().nullable(),
});

type FormType = z.infer<typeof formSchema>;

export interface PersonalTabProps {
  onCreate: (data: IDriverData) => void;
  data: IDriverData | null;
}

const GeneralTab: FC<PersonalTabProps> = ({ onCreate, data }) => {
  const [loading, setLoading] = useState(false); // Loading state to manage button

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      mobileNumber: "",
      telephoneNumber: "",
      emergencyNumber: "",
      address: "",
      city: "",
      postCode: "",
      county: "",
      country: "",
      companyName: "",
      companyNumber: "",
      companyVatNumber: "",
      note: "",
      photo: "",
    },
  });

  async function onSubmit(values: FormType) {
    if (data?.generalData) {
      setLoading(true); // Set loading to true when submitting

      const sanitizedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [
          key,
          value === null ? undefined : value,
        ])
      );

      const requestData = {
        personalData: {
          ...sanitizedValues,
          photo: values.photo || undefined,
        },
      };

      try {
        const response = await axios.put(`/api/driver/${data.id}`, requestData);
        onCreate({ ...data, ...requestData }); // Update parent state with new data
        Swal.fire({
          icon: "success",
          title: "Updated successfully",
          text: "The driver data has been updated.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating the driver data.",
        });
      } finally {
        setLoading(false); // Set loading to false after operation completes
      }
    }
  }
  useEffect(() => {
    if (data) {
      form.reset(data.personalData);
    }
  }, [data]);

  return (
    <Form {...form}>
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="photo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Photo</FormLabel>
                <FileUpload
                  uploadedFiles={field.value ? [field.value] : undefined}
                  onUploadComplete={(files) => field.onChange(files[0])}
                />
                {/* <ProfilePhoto
                  // currentImageUrl={user.profileImage}
                  onUploadComplete={(urls) => {
                    // Handle the newly uploaded image URL (usually the first one)
                    const newImageUrl = urls[0];
                    // Update your user profile with the new image URL
                  }}
                  onRemoveFile={(file) => {
                    // Handle removing the profile photo
                    // Reset the user's profile image to null/default
                  }}
                /> */}
                <FormDescription>
                  Upload a profile photo (max 4MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              name="dateOfBirth"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="mobileNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              name="telephoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Telephone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="emergencyNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Emergency Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="postCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PostCode</FormLabel>
                  <FormControl>
                    <Input placeholder="PostCode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              name="county"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County</FormLabel>
                  <FormControl>
                    <Input placeholder="County" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="companyName"
            control={form.control}
            // rules={{ required: "Photo is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              name="companyNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="companyVatNumber"
              control={form.control}
              // rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company VAT Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Company VAT Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="note"
            control={form.control}
            // rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormDescription>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input type="Description" placeholder="Note" {...field} />
                </FormControl>
                <FormMessage />
              </FormDescription>
            )}
          />

          <div className="grid  grid-cols-2  gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Add"}
            </Button>
            <Button variant="outline" type="submit">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default GeneralTab;
