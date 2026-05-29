import React from "react";
import PageWrap from "./pageWrap";

const page = ({ params }: { params: { id: string } }) => {
  return <PageWrap id={params.id} />
};

export default page;


