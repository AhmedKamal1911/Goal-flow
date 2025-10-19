import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";

const abeezee = ABeeZee({
  variable: "--font-abeezee",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Goal Flow",
  description: "Stay focused. Reach your goals with Goal Flow Dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(abeezee.variable)}>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
