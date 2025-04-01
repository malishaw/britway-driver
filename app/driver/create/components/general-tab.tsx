"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";

import axios from "axios";

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
import { IDriverGeneralData } from "@/app/typings";
import { IDriverData } from "@/app/typings/interfaces/driverData";
import { error } from "console";
import { UploadDropzone } from "@/lib/uploadthing";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  uniqueId: z.string().min(1, {
    message: "Unique ID is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),

  password: z.string(),
  // .
  // min(8, {
  //   message: "Password must be at least 8 characters.",
  // }),
  confirmPassword: z.string(),
  // .min(8, {
  //   message: "Confirm password must be at least 8 characters.",
  // }),
  // photo: z.string().url({
  //     message: "Photo must be a valid URL.",
  // }),
  language: z.string(),
  // .min(2, {
  //   message: "Language must be at least 2 characters.",
  // }),
  timezone: z.string(),
  // .min(2, {
  //   message: "Timezone is required.",
  // }),
  fleetOperator: z.string(),
  // .min(2, {
  //   message: "Fleet operator is required.",
  // }),
});

type FormType = z.infer<typeof formSchema>;

export interface IGeneralTabProps {
  onCreate: (data: IDriverData) => void;
  data: IDriverData | null;
}

const GeneralTab: React.FC<IGeneralTabProps> = ({ onCreate, data }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      uniqueId: "",
      email: "",
      password: "",
      confirmPassword: "",
      // photo: "",
      // status: "Approved",
      language: "English",
      timezone: "UTC+01:00 London",
      fleetOperator: "Unassigned",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(data.generalData);
    }
  }, [data]);

  function onSubmit(values: FormType) {
    setLoading(true);

    const requestData: IDriverData = {
      generalData: {
        displayName: values.displayName,
        // photo:values.photo,
        uniqueId: values.uniqueId,
        email: values.email,
        password: values.password,
        language: values.language,
        timezone: values.timezone,
        fleetOperator: values.fleetOperator,
        photo: undefined,
      },
      isDeleted: false,
      personalData: data?.personalData,
      otherData: data?.otherData,
    };

    if (data?.id) {
      axios.put(`/api/driver/${data.id}`, requestData).then(
        (response) => {
          console.log("Updated successful>>>>");
          onCreate({ ...response.data, ...requestData });
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    } else {
      axios.post("/api/driver", requestData).then(
        (response) => {
          console.log("Create successful>>>>");
          onCreate({ ...response.data, ...requestData });
          Swal.fire({
            icon: "success",
            title: "Created successfully",
            text: "The driver's general data has been created.",
          });
          setLoading(false);
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while creating the driver data.",
          });
          console.log(error);
          setLoading(false);
        }
      );
    }
  }

  return (
    <Form {...form}>
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <div className=" grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1  gap-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Display name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="uniqueId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unique ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Unique ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            name="photo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <div
                    className="bg-no-repeat object-cover bg-cover"
                    style={
                      field.value
                        ? { backgroundImage: `url(${field.value})` }
                        : undefined
                    }
                  >
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                     type="password"
                     placeholder="Password"
                     {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          {/* <FormField
            name="photo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload photo (512x512px)</FormLabel>
                <FormControl>
                  <Input id="picture" type="file" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>

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
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <FormField
              name="language"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a correct language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="timezone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TimeZone</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a correct timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="UTC+01:00 London">
                        UTC+01:00 London
                      </SelectItem>
                      <SelectItem value="UTC-05:00 New York">
                        UTC-05:00 New York
                      </SelectItem>
                      <SelectItem value="UTC+09:00 Tokyo">
                        UTC+09:00 Tokyo
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          <FormField
            name="fleetOperator"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fleet Operator</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a correct fleet operator" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                  </SelectContent>
                </Select>

                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <Button variant="secondary" type="submit">
              Edit Notification2
            </Button>
          </div> */}
          <div className="grid grid-cols-2 gap-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Add
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
