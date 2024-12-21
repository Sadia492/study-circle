import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
}
