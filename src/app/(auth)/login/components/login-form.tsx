"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormInput from "@/components/form-input";
import FormWrapper from "@/components/form-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function ProfileForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("SUBMIT");
    console.log(values);
  }

  return (
    <>
      <FormWrapper
        form={form}
        onSubmit={onSubmit}
        className="w-full max-w-[450px]"
      >
        <FormInput
          name="username"
          placeholder="Enter username"
          label="Username"
        />
        <FormInput
          name={"password"}
          placeholder="Enter password"
          label="Password"
        />
        <div className="w-full flex justify-between">
          <Button type="submit">Log In</Button>
          <Button
            variant={"outline"}
            type="button"
            onClick={() => router.push("register")}
          >
            No account? Register now!
          </Button>
        </div>
      </FormWrapper>
    </>
  );
}
