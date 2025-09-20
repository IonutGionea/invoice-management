"use client"


import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { loginUser } from "./state/authSlice";


const formSchema = z.object({
  email: z.string().min(2, "Email is reuqired.").email("Invalid email address."),
  password: z.string().min(4, "Password should be at least 4 characters")
})

type LoginForm = z.infer<typeof formSchema>;



export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.auth)

  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginForm) {
    dispatch(loginUser(values))
      .then(() => navigate("/invoices"));
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 mx-auto ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-md border-2 p-12">
          <div>
            <div className="flex flex-col items-start ">
              <h2 className="text-2xl font-bold ">Welcome back</h2>
              <p className="text-muted-foreground text-balance ">Login to your account</p>
            </div>

          </div>
          {error && (
            <div
              id="server-error"
              role="alert"
              className="text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded"
            >
              {error}
            </div>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
                  <Input placeholder="" {...field} type="password" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">{loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Signing in…
            </>
          ) : (
            "Sign in"
          )}</Button>
        </form>
      </Form>
    </div>
  );
}

