import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { UseFormReturn, Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/utils";

const authFormSchema = formSchema("sign-up");

interface CustumInput {
  control: Control<z.infer<typeof authFormSchema>>;
  name: FieldPath<z.infer<typeof authFormSchema>>;
  label: string;
  placeholder: string;
}
const CustumInput = ({ control, name, label, placeholder }: CustumInput) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="form-item">
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  type={
                    name === "password"
                      ? "password"
                      : name === "email"
                      ? "email"
                      : "text"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        )}
      />
    </>
  );
};

export default CustumInput;
