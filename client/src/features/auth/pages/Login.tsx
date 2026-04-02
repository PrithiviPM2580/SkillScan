import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { MailIcon, LockKeyholeIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginInput } from "../validation/auth-validation";

const Login = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginInput) {}

  return (
    <section className="w-full h-svh flex items-center justify-center px-4">
      <Card className="w-full sm:max-w-md rounded-xl">
        <CardHeader className="items-center justify-center text-center">
          <CardTitle className="text-3xl font-semibold md:text-4xl">
            Login
          </CardTitle>
          <CardDescription>
            Join thousands of professionals optimizing their impact.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-email">
                      Email Address
                    </FieldLabel>
                    <div className="relative">
                      <MailIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        type="email"
                        placeholder="john.doe@example.com"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        className="rounded-sm py-5 pl-10 border-none outline-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-password">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <LockKeyholeIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="form-rhf-demo-password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        className="rounded-sm py-5 pl-10 border-none outline-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="w-full flex-col items-center justify-center gap-4">
          <Button
            type="submit"
            form="form-rhf-demo"
            className="w-full rounded-sm py-6"
          >
            Login
          </Button>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Login;
