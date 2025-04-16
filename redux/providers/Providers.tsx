"use client";

import React from "react";
import { reduxStore } from "@/redux/store/Store";
import { Provider } from "react-redux";

// ***** Providers *****
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};

export default Providers;
