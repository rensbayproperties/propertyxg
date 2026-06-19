"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "@/components/Container";
import SectionContainer from "@/components/SectionContainer";
import { Icons } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Section from "@/components/Section";
import siteData from "@/constant/site";
import { DataTableFilter } from "@/components/ui/table/data-table-filter";
import LocationProjectSearchDropdown from "@/components/LocationProjectSearchDropdown";
import PropertyCategoryDropdown from "@/components/PropertyCategoryFilter";
import ExtraFilter from "@/components/search/ExtraFilter";
import PriceFilter from "@/components/search/PriceFilter";
import useListing from "@/hooks/useListing";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Feature = {
  icon?: keyof typeof Icons;
  title: string;
  items: string[];
}

const PageWrap = () => {
  const {
    availableLanguages,
    language,
    setLanguage,
    listings,
    gettingListings,
    isDialogOpen,
    setIsDialogOpen,
    setSelectedListingId,
    selectedListingId,
    form,
    isPendingPropertyContact,
    onSubmit,
    selectedListing,
    isLoadingSelectedListing,
    location,
    setLocation,
    projectId,
    setProject,
    pType,
    setlistingCategoryId,
    listingCategoryId,
    gettingCategory,
    setMaxPrice,
    setMinPrice,
    maxPrice,
    minPrice,
    setBedroom,
    setBathroom,
    bedroom,
    bathroom,
    setListType,
    listType,
    dealTypeOptions,
    allcategories,
    isLoadingCategory,
  } = useListing()

  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempBedroom, setTempBedroom] = useState(bedroom);
  const [tempBathroom, setTempBathroom] = useState(bathroom);
  const [LinkLocation, setLinkLocation] = useState("");
  const [tempLanguage, setTempLanguage] = useState(language);
  const [filters, setFilters] = useState(false);

  const features = [
    {
      title: "Find anything with AI",
      description: "Hide basement flats, discover renovation projects and surface homes that",
      url: "",
      cta: "Get started",
      image: "/assets/images/hero/feat-1.png",
    },
    {
      title: "Do more with Xg WhatsApp AI",
      description: "Discover more on the Go. Explore homes across different neighbourhoods",
      url: "",
      cta: "Get started",
      image: "/assets/images/hero/feat-2.png",
    },
    {
      title: "Xg Agents",
      description: "Find trusted agents awarded for their excellent performance",
      url: "",
      cta: "Get started",
      image: "/assets/images/hero/feat-3.png",
    },
  ]

  return (
    <div>
      <div className="relative flex items-center justify-center w-full">
        <div className="w-full">
          <div className="flex flex-col gap-4 md:gap-6 min-h-[40vh] w-full items-center justify-center py-10 md:py-24 relative bg-black">
            <div
              className="absolute left-0 top-0 h-full w-full bg-cover bg-center z-0 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url('/assets/images/hero/2.webp')]"
            ></div>
            <div className="flex flex-col leading-[1.2] justify-center items-center w-full gap-2 z-10 px-4 text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white max-sm:max-w-xs">The Smarter Way to Find Home</div>
              {/* <div className="text-4xl md:text-5xl font-extrabold text-white">Your home search starts here</div> */}
              <div className="text-xl text-white">Find properties to rent, buy or invest.<span className="text-brand">.</span></div>
            </div>
            <Tabs defaultValue="crm" className="w-full z-10">
              <TabsList className="w-full">
                <Container size="sm" className="w-full flex items-center relative">
                  <div className="inline-flex items-center bg-white gap-y-2 flex-wrap justify-center rounded-2xl mx-auto p-1 text-sm">
                    <TabsTrigger value="crm"><div className="flex gap-2 items-center">For sale</div></TabsTrigger>
                    <TabsTrigger value="marketplace"><div className="flex gap-2 items-center">For rent</div></TabsTrigger>
                    <TabsTrigger value="growth"><div className="flex gap-2 items-center">Agents</div></TabsTrigger>
                  </div>
                </Container>
              </TabsList>
              <Container size="sm" className="h-[12rem]">
                <TabsContent value="crm" className="z-10">
                  <div className="flex flex-wrap items-center w-full bg-[#E7D7F6]ss bg-brand rounded-3xl p-2 gap-2">
                    <div className="w-full flex flex-col relative bg-white rounded-2xl overflow-hidden">
                      <div className="w-full">
                        <Textarea
                          placeholder="Find anything..."
                          // disabled={isLoading}
                          // {...field}
                          className="p-3 text-lg border-none rounded-none !ring-transparent focus:!ring-transparent"
                        />
                      </div>
                      <div className="flex gap-2 p-2 items-end">
                        <span className="px-2 font-medium flex items-center gap-1.5"><i className="bi-geo-alt-fill text-brand"></i> All of Dubai</span>
                        <span className="px-2 font-medium flex items-center gap-1.5">Properties for sale <i className="bi-chevron-down"></i></span>
                        <button className="p-0 ml-auto"><i className="bi-arrow-right-circle-fill rounded-full text-3xl md:text-4xl text-brand"></i></button>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 w-full px-2">
                      <div className="flex items-center gap-2 font-semibold">
                        <i className="bi-stars text-yellow-400"></i>
                        <span className="text-white">AI Powered search</span>
                      </div>
                      <div className="ml-auto flex gap-2">
                        <Sheet>
                          <SheetTrigger>
                            <Button className="font-normal rounded-xl px-3" variant={"outline"} size={"sm"}>
                              <i className="bi-filter"></i> All Filters
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="z-[99999]" side={"left"}>
                            <div className="relative w-full flex flex-col h-full space-y-5">
                              <div className="flex flex-col items-start justify-between shrink-0">
                                <h2 className="text-lg lg:text-2xl font-bold flex gap-2 items-center">
                                  All Filters <span className="text-base bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center leading-none font-semibold">2</span>
                                </h2>
                              </div>

                              <div className="flex flex-col justify-between items-center w-full h-full">
                                <div className="grid grid-cols-1 w-[100%] gap-2">
                                  <div className="form-label">Location</div>
                                  <LocationProjectSearchDropdown
                                    onLocationSelect={(selectedItem) => {
                                      if (selectedItem.type === "project") {
                                        setProject(String(selectedItem.id));
                                        setLocation(null);
                                        setLinkLocation(String(selectedItem.title));
                                      } else {
                                        setLocation(String(selectedItem.id));
                                        setProject(null);
                                        setLinkLocation(selectedItem.title);
                                      }
                                    }}
                                  />

                                  <PropertyCategoryDropdown
                                    options={allcategories || []}
                                    setFilterValue={setlistingCategoryId}
                                    filterValue={listingCategoryId}
                                    isLoading={isLoadingCategory}
                                  />
                                  <ExtraFilter
                                    beds={tempBedroom}
                                    baths={tempBathroom}
                                    setBeds={setTempBedroom}
                                    setBaths={setTempBathroom}
                                  />
                                  <PriceFilter
                                    minPrice={tempMinPrice}
                                    maxPrice={tempMaxPrice}
                                    setMinPrice={setTempMinPrice}
                                    setMaxPrice={setTempMaxPrice}
                                  />
                                  <PriceFilter
                                    minPrice={tempMinPrice}
                                    maxPrice={tempMaxPrice}
                                    setMinPrice={setTempMinPrice}
                                    setMaxPrice={setTempMaxPrice}
                                  />
                                  <DataTableFilterBox
                                    title="Language"
                                    options={availableLanguages || []}
                                    filterValue={tempLanguage}
                                    setFilterValue={setTempLanguage}
                                    className="w-full p-2 flex justify-between items-center"
                                  />
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4 pt-5">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-auto h-12 px-8 rounded-2xl text-base"
                                  >
                                  </Button>

                                  <Button
                                    type="button"
                                    className="w-full flex-1 h-12 text-base font-semibold bg-brand hover:bg-brand text-white"
                                    onClick={async () => {
                                      const updates: Promise<any>[] = [];
                                      if (tempMinPrice)
                                        updates.push(setMinPrice(tempMinPrice));
                                      if (tempMaxPrice)
                                        updates.push(setMaxPrice(tempMaxPrice));
                                      if (tempBedroom)
                                        updates.push(setBedroom(tempBedroom));
                                      if (tempBathroom)
                                        updates.push(setBathroom(tempBathroom));
                                      if (tempLanguage)
                                        updates.push(setLanguage(tempLanguage));

                                      await Promise.all(updates);

                                      setFilters(false);
                                    }}
                                  >
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Container>
            </Tabs>
          </div>
        </div>
      </div>
      <Section>
        <Container className="space-y-4 md:space-y-8">
          <div className="page-heading-sm text-center !font-medium">Explore, save, and share homes with AI-powered search</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {
              features.map((feature: any, i: number) => {
                return <div key={`__${i}`} className="bg-gradient-to-bs bg-stone-100 from-brand/10s to-gray-50s border rounded-2xl flex flex-col gap-2 p-4 md:p-4 items-center text-center">
                  <div><Image src={feature.image} alt={""} width={300} height={200} /></div>
                  <div className="font-semibold text-lg max-w-xs">{feature.title}</div>
                  <div className="text-sm max-w-xs pb-2">{feature.description}</div>
                </div>
              })
            }
          </div>
        </Container>
      </Section>
      <div className="h-screen"></div>
      <div className="bg-gradient-to-b from-white to-brand/20 py-20 md:py-26">
        <Container>
          <div className="flex flex-col gap-y-2">
            <div className="text-3xl md:text-4xl text-center leading-[1.2] mx-auto font-bold">
              Your home search starts here<span className="text-brand">.</span>
            </div>
            <div className="flex items-center justify-center text-lg text-center leading-[1.2] max-w-lg mx-auto opacity-60">Join hundreds of agencies and property managers who run their operations smarter with PortalXg</div>
            <div className="flex gap-3 items-center justify-center mt-4">
              <Link href="" passHref>
                <Button variant={"brand"} size={"lg"}>Get Started Free</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PageWrap;
