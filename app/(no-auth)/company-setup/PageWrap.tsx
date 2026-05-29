"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useCompanySetup from "@/hooks/useCompanySetup";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import { useSession } from "next-auth/react";

const PageWrap = () => {
  const { form, handleSubmit, isLoading, isPending } = useCompanySetup();
  const { data: session }: { data: any } = useSession();
  const fullName = `${session?.user?.first_name || ""} ${session?.user?.last_name || ""}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: "url(/assets/images/authbg.jpg)" }}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div className="md:flex-col gap-4 md:gap-8 hidden md:flex">
            <div className="font-bold text-3xl max-w-sm">One step away</div>
            <ul className="space-y-2 md:space-y-3 font-medium opacity-60">
              <li>Targeted Campaigns to deliver personalized offers</li>
              <li>Powerful automations to resolve issues faster</li>
              <li>Pre-built templates to send updates & reminders</li>
              <li>24x7 instant engagement with no-code chatbots</li>
              <li>Integrations to bring in context from PropertyFinder, Bayut, etc.</li>
            </ul>
          </div>
          <div className="space-y-4 max-sm:py-6">
            <div className="mx-auto w-full max-w-lg p-6 card md:rounded-2xl">
              <div className="flex flex-col gap-6 w-full">
                <PageTitle title="Setup Company" subtitle="Company Account Setup" />
                <div>
                  <div>
                    <div className="flex items-baseline gap-1 justify-center">
                      <i className="bi-person-circle text-brand mr-1"></i>
                      <div className="opacity-70">{`You're logged in as ${fullName}`}</div>
                    </div>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex gap-4 flex-col">
                      <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Choose a username</FormLabel>
                            <FormControl>
                              <div className="flex max-sm:flex-col rounded-md border border-gray-300 overflow-hidden shadow-sm">
                                <span className="flex items-center px-3 py-2 bg-brand/10 text-brand font-bold text-sm whitespace-nowrap gap-1">
                                  <i className="bi-globe"></i>
                                  https://
                                </span>
                                <input
                                  type="text"
                                  disabled={isLoading}
                                  {...field}
                                  className="flex-1 px-3 py-2 focus:outline-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
                                  placeholder="username"
                                />
                                <span className="flex items-center px-3 py-2 bg-brand/10 text-brand font-bold text-sm whitespace-nowrap gap-1">
                                  .crmdubai.com
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button loading={isPending} type="submit" variant={"brand"} className="rounded-full shadow">
                      {isPending ? "Please wait..." : "Continue"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            <div className="text-center text-xs">@ CRM Dubai 2025. All rights reserved</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PageWrap;
