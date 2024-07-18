"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormInput from "@/components/form-input";
import FormWrapper from "@/components/form-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "The username is required.",
    }),
    password: z.string().min(1, {
      message: "The password is required.",
    }),
    repeat_password: z.string().min(1, {
      message: "The repeat password is required.",
    }),
    email: z.string().email("The email is not valid."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeat_password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["repeat_password"],
      });
    }
  });

type RegisterFormSchema = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      repeat_password: "",
      email: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: RegisterFormSchema) {
    setLoading(true);
    try {
      const data = await axiosInstance.post("/auth/register", values, {});
      toast({ title: "Succesfully created!", variant: "default" });
      router.push("/login");
    } catch (e) {
      toast({ title: "Error in creating user!", variant: "destructive" });
    }
    setLoading(false);
  }

  return (
    <>
      <FormWrapper
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[450px] space-y-4"
      >
        <FormInput
          name="username"
          placeholder="Enter username"
          label="Username"
        />
        <FormInput
          name="password"
          placeholder="Enter password"
          label="Password"
          inputType="password"
        />
        <FormInput
          name="repeat_password"
          placeholder="Repeat password"
          label="Repeat Password"
          inputType="password"
        />
        <FormInput
          name="email"
          placeholder="Enter email"
          label="Email"
          inputType="email"
        />
        <div className="w-full flex justify-between">
          <Button loading={loading} disabled={loading} type="submit">
            Register
          </Button>
          <Button
            variant={"outline"}
            type="button"
            onClick={() => router.push("login")}
          >
            Already have an account? Log in!
          </Button>
        </div>
      </FormWrapper>
    </>
  );
}
