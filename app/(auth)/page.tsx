import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./_components/login-form";
import Link from "next/link";

export const metadata = {
  title: "Login | Goal Flow",
  description: "Access your Goal Flow dashboard and stay on track.",
};

export default async function LoginPage() {
  return (
    <section className="flex flex-col items-center justify-center flex-1">
      <Card className="w-full max-w-md shadow-lg border border-indigo-100/50 backdrop-blur-sm bg-white/80">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Welcome Back 👋
          </CardTitle>
          <CardDescription className="text-gray-500">
            Log in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="max-sm:px-3">
          <LoginForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
