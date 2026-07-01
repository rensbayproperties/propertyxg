"use client";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAccountSetup from "@/hooks/useAccountSetup";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const PageWrap = () => {
  const { initialPageLoad, form, isPending, onSubmit } = useAccountSetup();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url(/assets/images/authbg.jpg)" }}>
      <Container>
        <div className="flex justify-center items-center px-5 min-h-screen max-w-lg mx-auto">
          {initialPageLoad ? (
            <div className="flex flex-col justify-center items-center gap-2 text-center text-white">
              <Loader2 className={cn("h-14 w-14 animate-spin")} />
              <p>Validating token. Please wait.</p>
            </div>
          ) : (
            <div className="flex justify-center flex-col gap-8 mx-auto border p-6 shadow rounded-md bg-white w-full">
              <div className="flex-col flex gap-2">
                <div className="mb-3">
                  <PageTitle title="Account Setup" subtitle="Almost there! Complete your account setup to get started" />
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField control={form.control} name="first_name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} placeholder="Enter Firstname" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                    />
                    <FormField control={form.control} name="last_name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lastname</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} placeholder="Enter Lastname" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                    />
                    <FormField control={form.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Create Password</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} placeholder="******" {...field} type="password" togglePassword />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                    />
                    <Button type="submit" loading={isPending} variant={"brand"}>
                      {isPending ? "Please wait..." : "Continue"}
                    </Button>
                  </form>
                </Form>
                <Link href="/signin" className="mt-6 flex gap-2 items-center text-lg">
                  <span>Have an account?</span>
                  <span className="text-brand">Sign In</span>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="text-center text-xs">
          @ PropertyXg 2025. All rights reserved
        </div>
      </Container>
    </div>
  );
};

export default PageWrap;
