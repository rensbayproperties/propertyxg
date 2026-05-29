import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";
import PageWrap from "./PageWrap";

export const metadata: Metadata = {
  title: "PortalXg - Home",
  description: "Welcome to PortalXg - Your business growth partner",
};

export default function Home() {
  return (
    <HomeLayout>
      <PageWrap />
    </HomeLayout>
  );
}
