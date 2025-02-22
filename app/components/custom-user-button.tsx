"use client";
import { SignInButton, SignedIn, SignedOut, UserButton, OrganizationSwitcher, Protect } from '@clerk/nextjs'
import { useUser } from "@clerk/clerk-react";
import { useTheme } from 'next-themes'
import { dark, shadesOfPurple } from '@clerk/themes'
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";


const CustomUserButton = ({ showName }: { showName?: boolean }) => {
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();
  const { theme } = useTheme();
  const router = useRouter();
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
    isUserLoaded && isSignedIn && <UserButton appearance={clerkAppearence} showName={showName} >
      <UserButton.MenuItems>
        <UserButton.Action
          label="Dashboard"
          labelIcon={<Home className="w-3 h-3" />}
          onClick={() => router.push('/dashboard')}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default CustomUserButton;