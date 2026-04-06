import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { UserIcon, MailIcon, LockKeyholeIcon } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
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
import {
  registerSchema,
  type RegisterInput,
} from "../validation/auth-validation";
import useAuth from "../hooks/useAuth";
import { SpinnerCustom } from "@/components/ui/spinner";
import CustomError from "@/components/CustomError";

const Register = () => {
  const { registerUser, loading, error, user } = useAuth();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterInput) {
    await registerUser(data);
    toast.success("Registered successfully! Please login.");
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <SpinnerCustom />;
  }

  if (error) {
    return <CustomError message="Failed to register. Please try again." />;
  }

  return (
    <section className="w-full h-svh flex items-center justify-center px-4">
      <Card className="w-full sm:max-w-md rounded-xl">
        <CardHeader className="items-center justify-center text-center">
          <CardTitle className="text-3xl font-semibold md:text-4xl">
            Register
          </CardTitle>
          <CardDescription>
            Join thousands of professionals optimizing their impact.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-username">
                      Username
                    </FieldLabel>
                    <div className="relative">
                      <UserIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        {...field}
                        id="form-rhf-demo-username"
                        aria-invalid={fieldState.invalid}
                        placeholder="johndoe"
                        autoComplete="off"
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
            disabled={loading}
          >
            Register
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Register;
