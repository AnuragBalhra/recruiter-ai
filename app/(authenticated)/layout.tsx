import AuthenticatedSidebar from "../components/authenticated-sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import cx from "clsx";

export default async function AuthenticatedLayout({
  children,
  user
}: {
  children: any,
  user: any;
  }) {
  return (
    <div className="min-h-full bg-gray-100 text-gray-800 bg-gradient-to-br from-stone-100 to-slate-200 dark:from-slate-700 dark:to-stone-700 dark:text-white flex flex-row flex-1">
      <div className="flex flex-none">
        <AuthenticatedSidebar />
      </div>
      <div className={cx(
          "h-full flex flex-1"
        )}>
        {user}
      </div>
    </div>
  );
}
