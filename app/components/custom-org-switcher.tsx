"use client";
import { SignInButton, SignedIn, SignedOut, UserButton, OrganizationSwitcher, Protect } from '@clerk/nextjs'
import { useUser } from "@clerk/clerk-react";
import { useTheme } from 'next-themes'
import { dark, shadesOfPurple } from '@clerk/themes'

const CustomOrgSwitcher = ({ showName }: { showName?: boolean }) => {
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();
  const { theme } = useTheme();
  const clerkTheme = theme === "dark" ? dark: undefined;
  const clerkAppearence = { 
    baseTheme: clerkTheme, 
    variables: {
      colorPrimary: theme === 'dark' ? '#9333ea': '#2563eb',
      colorText: theme === "dark"? 'white': "black",
      colorBackground: theme === "dark"? '#111827': "white",
      colorNeutral: theme === 'dark' ? '#9333ea': '#2563eb'
    }, 
  }
  return (        
    isUserLoaded && isSignedIn && <div className="bg-gray-50 dark:bg-gray-900 rounded-lg py-1 px-2"><OrganizationSwitcher appearance={clerkAppearence}  /></div>
  );
};

export default CustomOrgSwitcher;