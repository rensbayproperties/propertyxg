
import React from "react";
import PageWrap from "./PageWrap";

const page = ({ params }: { params: { slug: string } }) => {
  return <PageWrap slug={params.slug} />
};

export default page;

