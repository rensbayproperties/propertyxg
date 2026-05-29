import React from "react";
import PageWrap from "./PageWrap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password to regain access to your account",
};

const page = () => {
  return <PageWrap/>;
};

export default page;
