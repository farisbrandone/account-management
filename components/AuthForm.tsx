"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import CustumInput from "./ui/CustumInput";
import { formSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const authFormSchema = formSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof authFormSchema>) {
    // Do something with the form values.
    setIsLoading(true);
    try {
      //Sign up with Appwrite & create plain link token

      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!,
        email: data.email,
        password: data.password,
      };

      if (type === "sign-up") {
        try {
          console.log("sign up");
          const newUser = await signUp(userData);
          setUser(newUser);
        } catch (error) {
          console.log("errors :");
          console.log(error);
        }
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        console.log("blablanla", response);
        if (response) {
          console.log("odod");
          router.push("/");
        }
      }

      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-5">
        <Link
          rel="stylesheet"
          href="/"
          className="cursor-pointer flex items-center gap-1"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustumInput
                      control={form.control}
                      name="firstName"
                      placeholder="Enter your first name"
                      label="First Name"
                    />
                    <CustumInput
                      control={form.control}
                      name="lastName"
                      placeholder="Enter your last name"
                      label="Last Name"
                    />
                  </div>
                  <CustumInput
                    control={form.control}
                    name="address1"
                    placeholder="Enter your address"
                    label="Address"
                  />
                  <CustumInput
                    control={form.control}
                    name="city"
                    placeholder="Enter your city"
                    label="city"
                  />
                  <div className="flex gap-4">
                    <CustumInput
                      control={form.control}
                      name="state"
                      placeholder="Enter your address"
                      label="State"
                    />
                    <CustumInput
                      control={form.control}
                      name="postalCode"
                      placeholder="Example: 11101"
                      label="Postal Code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustumInput
                      control={form.control}
                      name="dateOfBirth"
                      placeholder="YYYY-MM-DD"
                      label="Date Of Birth"
                    />
                    <CustumInput
                      control={form.control}
                      name="ssn"
                      placeholder="Example: 1234"
                      label="SSN"
                    />
                  </div>
                </>
              )}

              <CustumInput
                control={form.control}
                name="email"
                placeholder="Enter your email"
                label="Email"
              />
              <CustumInput
                control={form.control}
                name="password"
                placeholder="Enter your password"
                label="Password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1 ">
            <p className="text-14 font-normal">
              {type === "sign-in"
                ? "Don't have an account"
                : "Already have an account"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "sign Up" : "/sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
