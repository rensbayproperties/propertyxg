"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useResetPassword from "@/hooks/useResetPassword";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";

const PageWrap = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { form, handleSubmit, isLoading, isPending, tokenValid } = useResetPassword(token);

  // Show loading state while verifying token
  if (tokenValid === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: "url(/assets/images/authbg.jpg)" }}
      >
        <Container>
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="text-lg">Verifying reset token...</p>
          </div>
        </Container>
      </div>
    );
  }

  // Show error state if token is invalid
  if (tokenValid === false) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: "url(/assets/images/authbg.jpg)" }}
      >
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-red-500 text-xl font-bold">Invalid or Expired Token</div>
            <p>The password reset link is invalid or has expired.</p>
            <p className="text-sm opacity-60">Redirecting to forgot password page...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: "url(/assets/images/authbg.jpg)" }}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div className="md:flex-col gap-4 md:gap-8 hidden md:flex">
            <div className="font-bold text-3xl max-w-sm">
              Everything you need to grow your business
            </div>
            <ul className="space-y-2 md:space-y-3 font-medium opacity-60">
              <li>Targeted Campaigns to deliver personalized offers</li>
              <li>Powerful automations to resolve issues faster</li>
              <li>Pre-built templates to send updates & reminders</li>
              <li>24x7 instant engagement with no-code chatbots</li>
              <li>
                Integrations to bring in context from PropertyFinder, Bayut,
                etc.
              </li>
            </ul>
          </div>
          <div className="space-y-4 max-sm:py-6">
            <div className="mx-auto w-full max-w-lg p-6 card md:rounded-2xl">
              <div className="flex flex-col gap-6 w-full">
                <PageTitle title="Reset your password" subtitle="Enter your new password below" />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex gap-4 flex-col">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter new password"
                                disabled={isPending}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-red-500">
                              Password must contain at least one uppercase letter, one number, and one special character.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Confirm new password"
                                disabled={isPending}
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
                      disabled={isPending}
                    >
                      {isPending ? "Resetting..." : "Reset Password"}
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

