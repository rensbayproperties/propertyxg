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

  return (
    <div>
      <div className="relative flex items-center justify-center w-full">
        <div className="w-full">
          <div className="flex flex-col gap-4 md:gap-6 min-h-[65vh] w-full items-center justify-center py-10 md:py-16 to-brand from-brand/80 bg-gradient-to-b relative">
            <div
              className="absolute left-0 top-0 h-full w-full bg-cover bg-center z-0 opacity-50"
              style={{
                backgroundImage: "url('/assets/images/hero-2.jpg')",
              }}
            ></div>
            <div className="flex flex-col leading-[1.2] justify-center items-center w-full gap-2 z-10 px-4">
              <div className="text-4xl md:text-5xl font-extrabold text-white">Your home search starts here</div>
              <div className="text-2xl text-white">Find properties to rent, buy or invest.<span className="text-brand">.</span></div>
            </div>
            <Tabs defaultValue="crm" className="w-full z-10">
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
              <Container size="sm" className="h-[12rem]">
                <TabsContent value="crm" className="z-10 bg-white rounded-xl p-6 shadow">
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    <div className="w-full flex gap-2">
                      <div className="w-full">
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
                      </div>
                      <Button variant={"brand"} className="shadow rounded">Search</Button>
                    </div>

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
                    <div className="ml-auto">
                      <Sheet>
                        <SheetTrigger>
                          <Button className="ml-auto font-normal" variant={"outline"}>
                            <i className="bi-filter"></i> Filters
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="z-[99999]">
                          <div className="relative w-full flex flex-col h-full space-y-5">
                            <div className="flex flex-col items-start justify-between shrink-0">
                              <h2 className="text-lg lg:text-lg font-bold text-gray-900">
                                Filters Properties
                              </h2>
                              <p className="text-sm text-gray-500 mt-2">
                                Refine your property search with advanced filters
                              </p>
                            </div>

                            <div className="flex flex-col justify-between items-center w-full h-full">
                              <div className="grid grid-cols-1 w-[100%] gap-6">
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
              <Link href="" passHref>
                <Button variant={"light"} size={"lg"} className="text-brand">Book a Demo</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PageWrap;
