import React from "react";

interface DetailItemProps {
  label: string;
  value: string | string[];
}

const defaultDetailItemProps: DetailItemProps = {
  label: "",
  value: [], // Assign an empty array instead of an empty string
};

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => {
  return (
    <div className="flex items-baseline justify-start w-full py-2 border-b">
      <span className="w-1/2">{label}</span>
      <span className="w-1/2">
        {label.toLowerCase().includes("status") ? (
          <span className="bg-green-500 px-2 py-1 rounded">{value}</span>
        ) : Array.isArray(value) ? (
          <ul className="list-none">
            {value.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          value
        )}
      </span>
    </div>
  );
};

export default DetailItem;
