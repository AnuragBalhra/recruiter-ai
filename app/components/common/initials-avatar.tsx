import Image from "next/image";

export default function InitialsAvatar({ name, picture }: {name?: string | null, picture?: string}) {
    const nameArray = name?.trim()?.split(" ") ?? [];
    let nameInitials = "";

    if (nameArray.length === 1) {
        // If there's only one word in the name, use its first two letters as the initials
        nameInitials = nameArray[0].slice(0, 2);
    } else {
        // If there are multiple words in the name, concatenate the first letter of each word as before
        for (let i = 0; i < nameArray.length; i++) {
            nameInitials += nameArray[i][0];
        }
    }
    const initials = nameInitials.toUpperCase();
    
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-cyan-100 rounded-full dark:bg-cyan-600">
            {picture ? <Image className="w-full h-full rounded-full" width={64} height={64} src={picture} alt={name ?? ''} /> :
                <span className="text-primary-800 dark:text-primary-100">{initials}</span>}
        </div>
    );
}