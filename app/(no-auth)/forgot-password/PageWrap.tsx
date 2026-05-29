"use client";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useForgotPassword from "@/hooks/useForgotPassword";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";

const PageWrap = () => {
  const { form, handleSubmit, isLoading, isPending } = useForgotPassword();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url(/assets/images/authbg.jpg)" }}
    >
      <Container>
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="space-y-4 max-sm:py-6 max-w-lg w-full">
            <div className="mx-auto w-full max-w-lg p-6 card md:rounded-2xl">
              <div className="flex flex-col gap-6 w-full">
                <PageTitle title="Forgot Password?" subtitle="Let's help you get back your access into your account" />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex gap-4 flex-col">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Email Address"
                                disabled={isLoading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      loading={isPending}
                      type="submit"
                      variant={"brand"}
                      className="rounded-full shadow"
                    >
                      {isPending ? "Sending..." : "Send Reset Link"}
                    </Button>
                    <div>
                      <div className="flex items-center gap-2 justify-center">
                        <div>Remember your password?</div>
                        <Link href="/signin" className="font-bold text-link">
                          Sign in
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            <div className="text-center text-xs">
              @ CRM Dubai 2025. All rights reserved
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PageWrap;
