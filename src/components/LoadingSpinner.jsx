import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full min-h-[calc(100vh-353.6px)]">
      <img
        class="w-20 h-20 animate-spin"
        src="https://www.svgrepo.com/show/70469/loading.svg"
        alt="Loading icon"
      ></img>
    </div>
  );
}
