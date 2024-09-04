import axios from "axios";
import React from "react";


type DriverCellProps = {
  driver: string;
};

const DriverCell: React.FC<DriverCellProps> = ({ driver }) => {
  const [driverId, setDriverId] = React.useState<string | null>(null);

  // Parse the driver string to extract uniqueId and displayName
  const { uniqueId, displayName } = React.useMemo(() => {
    const [uniqueId, ...nameParts] = driver.split(" - ");
    const displayName = nameParts.join(" ");
    return { uniqueId, displayName };
  }, [driver]);

  React.useEffect(() => {
    axios
      .get("/api/driver", { params: { uniqueId, displayName } })
      .then((response) => {
        const drivers = response.data;

        // Iterate over the response data to find the matching driver
        for (const driverData of drivers) {
          const {
            uniqueId: fetchedUniqueId,
            displayName: fetchedDisplayName,
          } = driverData.generalData;

          // Check if the fetched uniqueId and displayName match the current ones
          if (
            fetchedUniqueId === uniqueId &&
            fetchedDisplayName === displayName
          ) {
            setDriverId(driverData.id);
            break;
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching driver ID:", error);
      });
  }, [uniqueId, displayName]);

  return (
    <a
      href={driverId ? `/driver-details/${driverId}` : "#"}
      title={driver}
      style={{
        textDecoration: "none",
        color: "blue",
        transition: "color 0.3s ease",
        cursor: driverId ? "pointer" : "not-allowed",
      }}
      onMouseEnter={(e) => driverId && (e.currentTarget.style.color = "#000080")}
      onMouseLeave={(e) => driverId && (e.currentTarget.style.color = "#0000FF")}
    >
      {driver}
    </a>
  );
};

export default DriverCell;
