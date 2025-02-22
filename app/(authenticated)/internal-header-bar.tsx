import dynamic from "next/dynamic"
import BackButton from "@/app/components/common/back-button";
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import CustomOrgSwitcher from '@/app/components/custom-org-switcher'

const InternalHeaderBar = ({ title }: {title: string}) => {
  return (
    <div className="flex shrink-0 h-16 w-full items-center gap-1 lg:gap-2 px-1 lg:px-3 py-3 px-5 md:py-3">
      <div className="md:hidden"><SidebarTrigger /></div>
      <BackButton />
      <div className="flex-1 flex flex-row justify-between">
        <h1 className="flex text-md lg:text-xl font-semibold tracking-tight text-center items-center justify-center lg:px-2">
          {title}
        </h1>
        <div className="flex justify-center items-center rounded-lg">
          <CustomOrgSwitcher />
        </div>
      </div>
    </div>
  );
};

export default InternalHeaderBar;