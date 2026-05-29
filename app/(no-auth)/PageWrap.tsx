"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/Container";
import SectionContainer from "@/components/SectionContainer";
import { Icons } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Section from "@/components/Section";
import siteData from "@/constant/site";

type Feature = {
  icon?: keyof typeof Icons;
  title: string;
  items: string[];
}

const PageWrap = () => {
  return (
    <div>
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        <div className="w-full">
          <div className="flex flex-col gap-4 md:gap-6 min-h-[65vh] w-full items-center justify-center py-10 md:py-16 bg-brand/10 relative">
            <div
              className="absolute left-0 top-0 h-full w-full bg-cover bg-center z-0"
              style={{
                backgroundImage: "url('/assets/images/hero-2.jpg')",
              }}
            ></div>
            <div className="flex flex-col leading-[1.2] justify-center items-center w-full gap-2 z-10">
              <div className="text-4xl md:text-5xl font-extrabold text-white">Your home search starts here</div>
              <div className="text-2xl text-white">Find properties to rent, buy or invest.<span className="text-brand">.</span></div>
            </div>
            <Tabs defaultValue="crm" className="space-y-5w w-full z-10">
              <TabsList className="w-full">
                <Container size="sm" className="w-full flex items-center relative">
                  <div className="inline-flex items-center bg-white gap-y-2 flex-wrap justify-center rounded-2xl mx-auto p-1">
                    <TabsTrigger value="crm"><div className="flex gap-2 items-center">Buy</div></TabsTrigger>
                    <TabsTrigger value="marketplace"><div className="flex gap-2 items-center">Rent</div></TabsTrigger>
                    <TabsTrigger value="website"><div className="flex gap-2 items-center">New Projects</div></TabsTrigger>
                    <TabsTrigger value="data"><div className="flex gap-2 items-center">Transactions</div></TabsTrigger>
                    <TabsTrigger value="growth"><div className="flex gap-2 items-center">Agents</div></TabsTrigger>
                  </div>
                </Container>
              </TabsList>
              <Container size="sm" className="bg-white rounded-2xl p-6 h-[20vh] shadow">
                <TabsContent value="crm" className="z-10 h-full">
                  <div className="flex h-full items-center justify-center">
                    <Link href="" passHref>
                      <Button variant={"brand"} className="shadow rounded-full">Search</Button>
                    </Link>
                  </div>
                </TabsContent>
              </Container>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="h-screen"></div>
      <Container>
        <div></div>
      </Container>
      <div className="h-screen"></div>
    </div>
  );
};

export default PageWrap;
