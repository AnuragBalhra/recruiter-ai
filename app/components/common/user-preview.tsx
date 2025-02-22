import Image from "next/image";
import InitialsAvatar from "@/app/components/common/initials-avatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Calendar } from "lucide-react";
import { format, render, cancel, register } from 'timeago.js';

export default function UserPreview({ userId, getUserDetails, displayName = false }: { userId?: string | null, getUserDetails: any, displayName?: boolean }) {
    const { isPending, isError, data: user, error } = useQuery({
        queryKey: ['user_details', { userId }],
        queryFn: async () => await getUserDetails({ userId }),
    })

    console.log("user details in user preview: ", user);
    const userEmail = user?.emailAddresses?.length > 0 ? user?.emailAddresses[0].emailAddress : null;
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="flex flex-row items-center justify-start hover:cursor-pointer"><InitialsAvatar
                    name={`${user?.firstName}`}
                    picture={user?.imageUrl}
                />
                   {displayName && <div className="flex flex-col">
                        <span className="text-xs ml-2">
                            {`${user?.firstName}`}
                        </span>
                    </div>}
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
                <div className="flex justify-around space-x-4">
                    <Avatar>
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>{`${user?.firstName}`}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</h4>
                        {user?.username && <p className="text-xs text-muted-foreground">
                            {`${user?.username}`}
                        </p>}
                        {userEmail && <p className="text-sm text-muted-foreground">
                            {`${userEmail}`}
                        </p>}
                        {user?.lastActiveAt && <div className="flex items-center pt-2">
                            <Calendar className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Last active {' '}
                                {format(user?.lastActiveAt, 'en_US')}
                            </span>
                        </div>}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}