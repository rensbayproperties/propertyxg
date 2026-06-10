import type { Metadata } from "next";
import PageWrap from "./PageWrap";

export const metadata: Metadata = {
  title: "CRM Dubai - Search",
  description: "Welcome to CRM Dubai - Your business growth partner",
};


interface PageProps {
  searchParams: Promise<{ dealType?: string; top_category?: string }>;
}

export default async function Search({ searchParams }: PageProps) {
  const params = await searchParams
  return <PageWrap searchParams={params} />;
}
