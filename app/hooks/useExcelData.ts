import React from "react";
import * as XLSX from "xlsx";

const useExcelData = () => {
  const [data, setData] = React.useState<unknown[]>([]);

  const excelToData = (file?: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };

    if (file) {
      reader.readAsArrayBuffer(new Blob([file]));
      // reader.readAsBinaryString(new Blob([file])); // this is deprecated
    }
  };

  return { data, excelToData };
};

export default useExcelData;
