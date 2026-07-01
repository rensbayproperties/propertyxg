"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";

const PageWrap = () => {
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
                <PageTitle title="Password Reset Link" subtitle="A link has been sent to your email address. Please click on the link and follow the steps to reset your password" />

                <div className="flex justify-center">
                  <Link href="/signin">
                    <Button
                      variant={"brand"}
                      className="rounded-full shadow"
                    >
                      Go Back to Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center text-xs">
              @ PropertyXg 2025. All rights reserved
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PageWrap;
