"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect } from "react";
import { GeneralTab, OtherTab, PersonalTab } from "./components";
import { IDriverData } from "@/app/typings/interfaces/driverData";
import { useParams } from "next/navigation";

export default function DriverUpdate() {
 const [driverData, setDriverData] = React.useState<IDriverData|null>(null);
 const {id} = useParams();
 const disableTabs = driverData === null;

   const handleOnCreate = (data: IDriverData) => {
    setDriverData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`/api/driver/${id}`);
    const data = await response.json();
    setDriverData(data);
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Add New Driver</h1>
      </div>
      <div
        className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <Tabs defaultValue="general" className="max-w-[800px] w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="personal" disabled={disableTabs}>Personal</TabsTrigger>
            <TabsTrigger value="other" disabled={disableTabs}>Other</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralTab onCreate={handleOnCreate} data={driverData}/>
          </TabsContent>
          <TabsContent value="personal">
            <PersonalTab onCreate={handleOnCreate} data={driverData}/>
          </TabsContent>
          <TabsContent value="other">
            <OtherTab  onCreate={handleOnCreate} data={driverData}/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
