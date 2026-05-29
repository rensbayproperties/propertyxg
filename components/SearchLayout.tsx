import React from "react";
import Navbar from "./Navbar";

const SearchLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div>
        <Navbar />
      </div>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default SearchLayout;
