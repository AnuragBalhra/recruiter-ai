import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function SignupPage({ searchParams: { redirect_url } }:
  { searchParams: { redirect_url: string } }
) {
  const { userId } = auth();
  
  if (userId) {
    redirect(redirect_url ?? "/");
  }

  return <div className="flex-1 h-[100vh] w-full flex items-center justify-center bg-white dark:bg-gray-800">
    <SignUp path="/sign-up" />
    </div>;
}  