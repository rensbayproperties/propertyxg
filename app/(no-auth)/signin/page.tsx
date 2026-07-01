import React from "react";
import PageWrap from "./PageWrap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your PropertyXg account",
};

const page = () => {
  return <PageWrap />;
};

export default page;
