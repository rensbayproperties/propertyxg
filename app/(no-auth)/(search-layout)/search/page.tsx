import type { Metadata } from "next";
import PageWrap from "./PageWrap";

export const metadata: Metadata = {
  title: "PropertyXg - Search",
  description: "Welcome to PropertyXg - Your business growth partner",
};


interface PageProps {
  searchParams: Promise<{ dealType?: string; top_category?: string }>;
}

export default async function Search({ searchParams }: PageProps) {
  const params = await searchParams
  return <PageWrap searchParams={params} />;
}
