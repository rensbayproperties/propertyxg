import HomeLayout from "@/components/HomeLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM Dubai - Home",
  description: "Welcome to CRM Dubai - Your business growth partner",
};

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <HomeLayout>
      {children}
    </HomeLayout>
  );
}
