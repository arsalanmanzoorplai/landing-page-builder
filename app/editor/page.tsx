import React, { Suspense } from "react";
import EDPage from "./editor-page";

const page = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <EDPage />
    </Suspense>
  );
};

export default page;
