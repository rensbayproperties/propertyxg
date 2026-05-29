import React from "react";
import PageWrap from "./PageWrap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your account",
};

const page = () => {
  return <PageWrap/>;
};

export default page;

