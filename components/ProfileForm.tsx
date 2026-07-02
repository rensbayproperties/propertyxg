"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/PhoneInput";
import { Card, CardContent } from "@/components/ui/card";
import useProfileForm from "@/hooks/useProfileForm";
import { Textarea } from "./ui/textarea";

const ProfileForm = () => {
  const { form, onSubmit, isPending } = useProfileForm();

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-brand">
            Contact <span>D . a . M . i</span>
          </h2>
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-4 flex-col">
                  <FormField
                    control={form.control}
                    name="name"
                    disabled={isPending}
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel className="text-sm">Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Phone Number</FormLabel>
                        <FormControl>
                          {/* <PhoneInput name="phone" control={form.control} /> */}
                          <Input disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="whatsapp"
                    disabled={isPending}
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Whatsapp</FormLabel>
                        <FormControl>
                          <PhoneInput control={form.control} name="whatsapp" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Email Address</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    disabled={isPending}
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel className="text-sm">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Enter message"
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
                  type="submit"
                  loading={isPending}
                  variant={"brand"}
                  className="shadow"
                >
                  {isPending ? "Please wait..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
