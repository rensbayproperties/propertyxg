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
import Link from "next/link";
import useSignin from "@/hooks/useSignin";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import useGoogleSignin from "@/hooks/useGoogleSignin";

const PageWrap = () => {
  const { form, handleSubmit, isLoading, isPending } = useSignin();
  const { login } = useGoogleSignin();

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
            {/* <div className="space-y-4">
              <div className="font-semibold">Trusted by 8000+ customers across 52 districts</div>
              <div>
                <Image src="/assets/images/bg2.png" alt="" width={500} height={60} />
              </div>
            </div> */}
          </div>
          <div className="space-y-4 max-sm:py-6">
            <div className="mx-auto w-full max-w-lg p-6 card md:rounded-2xl">
              <div className="flex flex-col gap-6 w-full">
                <PageTitle title="Welcome Back" subtitle="Login to continue" />
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex gap-4 flex-col">
                      <Button
                        className="rounded-full hover:bg-blue-100 border font-medium text-brand flex items-center leading-none justify-center"
                        type="button"
                        onClick={login}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18px"
                          height="18px"
                          viewBox="0 0 48 48"
                        >
                          <g>
                            <path
                              fill="#EA4335"
                              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            />
                            <path
                              fill="#4285F4"
                              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            />
                            <path
                              fill="#34A853"
                              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            />
                            <path fill="none" d="M0 0h48v48H0z" />
                          </g>
                        </svg>
                        <span className="mx-auto">Continue with Google</span>
                      </Button>
                      <div className="my-2 flex gap-x-3 justify-center items-center">
                        <div className="border-t-gray-400 border-t flex-grow h-0.5 rounded"></div>
                        <div className="font-semibold">
                          or Continue with email
                        </div>
                        <div className="border-t-gray-400 border-t flex-grow h-0.5 rounded"></div>
                      </div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder=""
                                disabled={isLoading}
                                {...field}
                                type="email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isLoading}
                                {...field}
                                type="password"
                                togglePassword
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
                        <Link href="/forgot-password" className="font-bold text-link">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <Button
                      loading={isPending}
                      type="submit"
                      variant={"brand"}
                      className="rounded-full shadow"
                    >
                      {isPending ? "Please wait..." : "Continue"}
                    </Button>
                    <div>
                      <div>
                        <div className="flex items-center gap-2 justify-center">
                          <div>Don't have an account?</div>
                          <Link href="signup" className="font-bold text-link">
                            Sign up
                          </Link>
                        </div>
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
