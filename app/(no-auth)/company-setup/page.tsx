import React from "react";
import PageWrap from "./PageWrap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Setup",
  description: "Set up your company profile and preferences",
};

const page = () => {
  return <PageWrap/>;
};

export default page;
