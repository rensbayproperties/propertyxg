"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosAuth from "./useAxiosAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useProfileForm = () => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { data: session }: { data: any } = useSession();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [formFilled, setFormFilled] = useState(false);
  // const [availableLanguages, setAvailableLanguages] = useState<
  //   { value: string; label: string }[]
  // >([]);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: " Name must be at least 2 characters.",
    }),
    phone: z.string({ message: "Please enter phone number." }),
    whatsapp: z.string().optional(),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    message: z.string().optional(),

  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      whatsapp: "",
      email: "",
      message: ""
    },
  });

  const { mutateAsync: submit, isPending } = useMutation({
    mutationFn: (credentials: any) => axiosAuth.patch("/profile/contatc", credentials),
    onSuccess: () => {
      toast("Success", { description: "Contacted successfully." });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      await submit(values);
    } catch (err: any) {
      toast("Failed", {
        description: "Something went wrong. Please try again later",
      });
    }
  };


  return {
    form,
    onSubmit,
    isPending,
  };
};

export default useProfileForm;
function setFormFilled(arg0: boolean) {
  throw new Error("Function not implemented.");
}
