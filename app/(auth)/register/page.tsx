import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./_components/register-form";

export const metadata = {
  title: "Register | Goal Flow",
  description:
    "Create your account and start achieving your goals with Goal Flow.",
};

export default async function RegisterPage() {
  return (
    <section className="flex flex-col items-center justify-center flex-1 px-4">
      <Card className="w-full max-w-md shadow-lg border border-indigo-100/50 backdrop-blur-sm bg-white/80">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Create Your Account ✨
          </CardTitle>
          <CardDescription className="text-gray-500">
            Join Goal Flow today and start reaching your goals
          </CardDescription>
        </CardHeader>

        <CardContent className="max-sm:px-3">
          <RegisterForm />

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
