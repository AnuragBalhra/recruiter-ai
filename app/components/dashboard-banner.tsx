import React, { useContext } from 'react'
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import InitialsAvatar from './common/initials-avatar';

export default async function DashboardBanner() {
    const user = await currentUser();
        
    return (
        <div className="flex flex-row items-center py-5 px-8 rounded-xl shadow-sm mb-2">
            <div className="flex flex-row items-center" id="onborda-welcome"><InitialsAvatar
                name={user?.fullName ?? ''}
                picture={user?.imageUrl}
            />
                <div className="pl-3">
                <div className="flex flex-row text-md ml-2 font-semibold text-gray-800 dark:text-gray-100">
                    Hello { ' '} {user?.fullName ?? ''} 
                </div>
                <div className="flex flex-row text-xs ml-2">
                    Welcome to Recruiter AI
                </div>
                </div>
            </div>
        </div>
    )
  }
