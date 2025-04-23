import React, { Suspense } from "react";
import WEDPage from "./website-editor-page";

const page = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <WEDPage />
    </Suspense>
  );
};

export default page;
