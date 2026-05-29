import SearchLayout from "@/components/SearchLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM Dubai - Search",
  description: "Welcome to CRM Dubai - Your business growth partner",
};

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <SearchLayout>
      {children}
    </SearchLayout>
  );
}
