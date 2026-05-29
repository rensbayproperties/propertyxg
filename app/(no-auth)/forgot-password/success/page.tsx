import React from "react";
import PageWrap from "./PageWrap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Reset Link Sent",
  description: "Password reset link has been sent to your email address",
};

const page = () => {
  return <PageWrap/>;
};

export default page;
