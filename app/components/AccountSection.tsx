"use client";
import { SignInButton, SignedIn, SignedOut, UserButton, OrganizationSwitcher, Protect } from '@clerk/nextjs'
import { useUser } from "@clerk/clerk-react";
import { useTheme } from 'next-themes'
import CustomUserButton from '@/app/components/custom-user-button'
import CustomOrgSwitcher from '@/app/components/custom-org-switcher'

const AccountSection = () => {
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();
  return (        
    isUserLoaded && <div className="flex flex-row gap-1 lg:gap-3items-center">
      {!isSignedIn ?
        <div className="btn bg-primary text-background dark:text-foreground w-24 rounded-xl hover:bg-primary/80">
          <SignInButton />
        </div>
      :
        <><div className="flex justify-center items-center rounded-lg">
            <CustomOrgSwitcher />
          </div>
          <CustomUserButton />
        </>
        }
    </div>
  );
};

export default AccountSection;