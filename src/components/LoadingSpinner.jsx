import React from "react";
import { HashLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-353.6px)]">
      <HashLoader size={70} color="#f8b200" />
    </div>
  );
}
